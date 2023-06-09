export interface HomeLayoutProps {
  title: string;
  tagLine?: string;
  className?: string;
  children: React.ReactNode;
}

export const HomeLayout = (props: HomeLayoutProps) => {
  return (
    <main>
      <div className={`h-screen flex flex-col items-center justify-center ${props.className}`}>
        <div className="max-w-2xl flex flex-col items-center justify-center">
          <h1 className="text-5xl mb-4 text-center">{props.title}</h1>
          {props.tagLine && <p className="text-xl mb-8 text-center">{props.tagLine}</p>}
          {props.children}
        </div>
      </div>
    </main>
  );
};
