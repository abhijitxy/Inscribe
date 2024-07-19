import dynamic from 'next/dynamic';

const Draw = dynamic(() => import('../components/draw'), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <Draw />
    </div>
  );
}