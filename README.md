# TTS Frontend

A modern, production-ready frontend for a Text-to-Speech (TTS) application.

## TODO FEATURE
- [✅] Login page: A login page with an email-password mechanism
- [✅] Register page
- [✅] Save record component
- [✅] List of a record component
  - [] Display a list of previous text-to-speech conversions.
  - [] Each history record should contain
    - [✅] The text that was converted.
    - [✅] The selected voice (language/accent)
    - [✅] The customization settings (rate, pitch, volume)
    - [✅] The date and time of the conversion
    - [] A button to replay the audio
- [✅] Logout component
- [] Text-to-speech component for Add Record
  - [✅] Allow users to adjust speech rate (speed), pitch, and volume using
    sliders or input fields.
  - [✅] A dropdown or selection menu to choose from available voices
  - [] Audio Controls: Buttons to start, pause, and stop the speech synthesis
- [] Text-to-speech component for Record Histories

## Features

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Authentication**: JWT-based authentication (login/register)
- **Core Features**:
    - User registration and login
    - Voice selection for TTS
    - Text-to-speech conversion and audio record creation
    - Floating player for audio playback
    - List and manage audio records

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

This will create a `build` directory with the production-ready assets.

## Deployment

This application can be deployed to any platform that supports Node.js. For example, you can use the `react-router-serve` command to run the server:

```bash
npm run start
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. The `tailwind-merge` and `clsx` utilities are used for combining and conditionally applying CSS classes.
