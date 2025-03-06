import { getUser } from "@/utils/auth";

export function withAdmin(pageGetServerSideProps) {
  return async (context) => {
    const userData = await getUser(context);
    const authUser = userData?.user;

    if (!authUser || !authUser.isAdmin) {
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
        authUser,
        ...props,
      },
    };
  };
}
