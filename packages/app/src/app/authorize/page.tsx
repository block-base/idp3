import { AuthorizeProps } from "@/components/organisms/Authorize";
import { AuthorizeTemplate } from "@/components/templates/Authorize";

type SearchParams = AuthorizeProps;

const validate = (searchParams: SearchParams) => {
  // TODO: implement
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  validate(searchParams);
  return (
    <main>
      <AuthorizeTemplate authorizeProp={searchParams} />
    </main>
  );
}
