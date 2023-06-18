"use client";

export interface LayoutProps {
  title: string;
  tagLine?: string;
  className?: string;
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return (
    <main>
      <div className={`min-h-screen w-full flex flex-col items-center justify-center py-12 ${props.className}`}>
        <h1 className="text-5xl mb-4 text-center">{props.title}</h1>
        {props.tagLine && <p className="text-xl mb-8 text-center">{props.tagLine}</p>}
        <div className="max-w-md w-full">{props.children}</div>
      </div>
    </main>
  );
};
