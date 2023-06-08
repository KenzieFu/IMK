import { Button, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Akun",
    href:"/admin/user",
    icon:"bi bi-person"
  },
  {
    title:"Siswa",
    href:"/admin/students",
    icon:"bi bi-person"
  },
  {
    title:"Buku",
    href:"/admin/books",
    icon:"bi bi-book"
  },
  {
    title:"Peminjaman Buku",
    href:"/admin/borrowed-books",
    icon:"bi  bi-book text-danger"
  },
  {
    title:"Pengembalian Buku",
    href:"/admin/returned-books",
    icon:"bi  bi-book text-primary"
  },
  {
    title:"Kalender",
    href:"/admin/calender",
    icon:"bi bi-calendar-event text-primary"
  },
  {
    title:"Pemesanan Buku",
    href:"/admin/booked-books",
    icon:"bi bi-book"
  },
  // {
  //   title:"HomePage",
  //   href:"/",
  //   icon:"bi bi-calendar-event text-primary"
  // },
  {
    title: "Histori",
    icon: "bi bi-journals",
    dropdown: [
      {
        title: "Log Buku",
        href: "/admin/log-buku",
      },
      {
        title: "Log Buku Perpustakaan",
        href: "/admin/log-buku-perpus",
      },
      {
        title: "Log Buku Tahun Ajaran Baru",
        href: "/admin/log-buku-thn-ajaran-baru",
      },
      {
        title: "Log Pemesanan Buku",
        href: "/admin/log-pemesanan-buku",
      },

    ],
  },
  /* {
    title: "Alert",
    href: "/admin/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/admin/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Buttons",
    href: "/admin/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Cards",
    href: "/admin/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Grid",
    href: "/admin/grid",
    icon: "bi bi-columns",
  },
  {
    title: "Table",
    href: "/admin/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/admin/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Breadcrumbs",
    href: "/admin/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "About",
    href: "/admin/about",
    icon: "bi bi-people",
  }, */
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
      <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.dropdown ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {navi.dropdown.map((dropdownItem, dropdownIndex) => (
                      <DropdownItem
                        key={dropdownIndex}
                        tag={Link}
                        to={dropdownItem.href}
                        className={
                          location.pathname === dropdownItem.href
                            ? "text-primary"
                            : "text-secondary"
                        }
                      >
                        {dropdownItem.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;