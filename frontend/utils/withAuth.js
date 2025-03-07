import { getUser } from "@/utils/auth";

export function withAuth(pageGetServerSideProps) {
  return async (context) => {
    const user = await getUser(context);

    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    let props = {};

    if (pageGetServerSideProps) {
      const result = await pageGetServerSideProps(context);

      if (result.redirect) {
        return {
          redirect: result.redirect,
        };
      }

      if (result.props) {
        props = result.props;
      }
    }

    return {
      props: {
        user,
        ...props,
      },
    };
  };
}
