import { getUser } from "@/utils/auth";

export function withAdmin(pageGetServerSideProps) {
  return async (context) => {
    const userData = await getUser(context);
    const user = userData?.user;

    if (!user || !user.isAdmin) {
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
