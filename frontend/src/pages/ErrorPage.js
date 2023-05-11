import { useRouteError } from 'react-router-dom';
import { Navbar } from '../UI/Navbar'
import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';
  console.log(error.data.message);
  console.log("iakefweiof")

  if (error.status === 500) {
    message = "LOL";
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <Navbar/>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;