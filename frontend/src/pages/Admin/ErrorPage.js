import { Outlet, useRouteError } from "react-router-dom";

import Sidebar from "../../layouts/Sidebar";

import Header from "../../layouts/Header";
import { Container } from "reactstrap";
import PageContent from "../../components/PageContent";

export const ErrorPage = () => {


    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';
    
  

  
    if (error.status === 500) {
      message = error.data.message;
    }
  
    if (error.status === 404) {
      title = 'Not found!';
      message = 'Could not find resource or page.';
    }

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
              <PageContent title={title}>
                <p>{message}</p>
              </PageContent>
          </Container>
        </div>
      </div>
    </main>
  );
};


