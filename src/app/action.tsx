'use server';

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { redis } from '~/lib/redis';
import { getServerAuthSession } from '~/server/auth';
import { cache } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags: string[];
}

interface Folder {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

const getUserId = cache(async (): Promise<string> => {
  const session = await getServerAuthSession();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
});

function getUserNotesKey(userId: string): string {
  return `user:${userId}:notes`;
}

export const getNotes = cache(async (): Promise<Note[]> => {
  const userId = await getUserId();
  const notesString = await redis.get(getUserNotesKey(userId));
  return notesString ? JSON.parse(notesString) : [];
});

export async function addNote(note: Note): Promise<void> {
  const userId = await getUserId();
  const notes = await getNotes();
  await redis.set(getUserNotesKey(userId), JSON.stringify([...notes, note]));
}

export async function updateNote(updatedNote: Note): Promise<void> {
  const userId = await getUserId();
  const notes = await getNotes();
  const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
  await redis.set(getUserNotesKey(userId), JSON.stringify(updatedNotes));
}

export async function deleteNote(id: string): Promise<void> {
  const userId = await getUserId();
  const notes = await getNotes();
  const updatedNotes = notes.filter(note => note.id !== id);
  await redis.set(getUserNotesKey(userId), JSON.stringify(updatedNotes));
}

export const getFolders = cache(async (): Promise<Folder[]> => {
  const userId = await getUserId();
  const foldersString = await redis.get(`user:${userId}:folders`);
  return foldersString ? JSON.parse(foldersString) : [];
});

export const getTags = cache(async (): Promise<Tag[]> => {
  const userId = await getUserId();
  const tagsString = await redis.get(`user:${userId}:tags`);
  return tagsString ? JSON.parse(tagsString) : [];
});

export async function getAnswer(question: string) {
  const { text, finishReason, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: question,
  });
  
  return { text, finishReason, usage };
}