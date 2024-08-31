# Inscribe

Welcome to Inscribe, where AI helps you effortlessly complete your notes. Just type `/` and let the AI handle the rest, making your note-taking faster and more efficient.

## Tech Stack

- **[Typescript](https://www.typescriptlang.org/)** - Language
- **[Next.js](https://nextjs.org/)** - framework
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[Vercel](https://vercel.com/)** - hosting
- **[OpenAI](https://openai.com/)** - AI
- **[Prisma](https://www.prisma.io/)** - ORM
- **[Redis](https://redis.io/)** 

## Local Development

### Requirements

To run Inscribe locally, you will need:

- **Node.js**: Ensure that Node.js is installed on your machine.

### Setup Instructions

1. **Fork this repository to your GitHub account.**

2. **Clone the repository to your local device:**

    ```bash
    git clone https://github.com/<your-username>/Inscribe
    ```

3. **Install dependencies in the root directory:**

    You can use either `npm` or `pnpm`:

    ```bash
    npm install
    ```

    or

    ```bash
    pnpm install
    ```

4. **Create your `.env` file from the `.env.example`. You can use:**

    ```bash
    cp .env.example .env
    ```

    Replace the placeholder values with your specific configurations.

5. **Set the following environment variables in the `.env` file:**

    - `NEXTAUTH_URL`
    - `NEXTAUTH_SECRET`
    - `OPENAI_API_KEY`
    - `DATABASE_URL`
    - `REDIS_URL` (Your Redis instance URL)

6. **Run the development server:**

    ```bash
    npm run dev
    ```

    or

    ```bash
    pnpm dev
    ```

7. **Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.**

## Deployment

Inscribe is hosted on **[Vercel](https://vercel.com/)**. To deploy your own version:

1. **Create a Vercel account** if you don’t have one.

2. **Connect your GitHub repository** containing the Inscribe codebase to Vercel.

3. **Set your environment variables** in the Vercel dashboard, ensuring they match those in your `.env` file.

4. **Deploy** by following Vercel's prompts. Your site will be live on a Vercel-provided URL.

## Contributing

Your feedback and contributions are always welcome. If you encounter any issues or have ideas for enhancements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Follow us on [Twitter](https://x.com/abhijit_devz) for updates. :)
