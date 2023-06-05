import { Authorize, AuthorizeProps } from "@/components/Authorize";

type SearchParams = AuthorizeProps;

const validate = (searchParams: SearchParams) => {
  // TODO: validate
  console.log(searchParams);
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  validate(searchParams);
  return (
    <main>
      <Authorize {...searchParams}></Authorize>
    </main>
  );
}
