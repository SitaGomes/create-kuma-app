'use client';
import { CustomText, Heading } from '@kuma/ui';

export const LandingView: React.FC = () => {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <Heading>create-kuma-app</Heading>
      <CustomText>
        Kick-start a fullstack aplication with Next.js, Nest.js, Typescript,
        inside a monorepo using Turborepo.
      </CustomText>
    </section>
  );
};
