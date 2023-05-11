import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Card, CardBody, CardFooter, CardTitle, Col, Table } from 'reactstrap'



const DUMMY_USER=[
    {id:"1",username:"Abdul",tipe:"siswa"},
    {id:"2",username:"Abdul",tipe:"siswa"},
    {id:"3",username:"Abdul",tipe:"siswa"},
    {id:"4",username:"Abdul",tipe:"siswa"},
    {id:"5",username:"Abdul",tipe:"siswa"},
    {id:"6",username:"Abdul",tipe:"siswa"},
    {id:"7",username:"Abdul",tipe:"siswa"},
    {id:"8",username:"Abdul",tipe:"siswa"},
    {id:"9",username:"Abdul",tipe:"siswa"},
    {id:"10",username:"Abdul",tipe:"siswa"},
    {id:"11",username:"Abdul",tipe:"siswa"},
    {id:"12",username:"Abdul",tipe:"siswa"},
    {id:"13",username:"Abdul",tipe:"siswa"},
    {id:"14",username:"Abdul",tipe:"siswa"},
    {id:"15",username:"Abdul",tipe:"siswa"},
    {id:"16",username:"Abdul",tipe:"siswa"},
    {id:"17",username:"Abdul",tipe:"siswa"},
    {id:"18",username:"Abdul",tipe:"siswa"},
    {id:"19",username:"Abdul",tipe:"siswa"},
    {id:"20",username:"Abdul",tipe:"siswa"},
    {id:"21",username:"Abdul",tipe:"siswa"},
    {id:"22",username:"Abdudl",tipe:"siswa"},
    {id:"15",username:"Abdul",tipe:"siswa"},
    {id:"16",username:"Abdul",tipe:"siswa"},
    {id:"17",username:"Abdul",tipe:"siswa"},
    {id:"18",username:"Abdul",tipe:"siswa"},
    {id:"19",username:"Abdul",tipe:"siswa"},
    {id:"20",username:"Abdul",tipe:"siswa"},
    {id:"21",username:"Abdul",tipe:"siswa"},
    {id:"22",username:"Abdudl",tipe:"siswa"},
    {id:"15",username:"Abdul",tipe:"siswa"},
    {id:"16",username:"Abdul",tipe:"siswa"},
    {id:"17",username:"Abdul",tipe:"siswa"},
    {id:"18",username:"Abdul",tipe:"siswa"},
    {id:"19",username:"Abdul",tipe:"siswa"},
    {id:"20",username:"Abdul",tipe:"siswa"},
    {id:"21",username:"Abdul",tipe:"siswa"},
    {id:"22",username:"Abdudl",tipe:"siswa"},
    {id:"15",username:"Abdul",tipe:"siswa"},
    {id:"16",username:"Abdul",tipe:"siswa"},
    {id:"17",username:"Abdul",tipe:"siswa"},
    {id:"18",username:"Abdul",tipe:"siswa"},
    {id:"19",username:"Abdul",tipe:"siswa"},
    {id:"20",username:"Abdul",tipe:"siswa"},
    {id:"21",username:"Abdul",tipe:"siswa"},
    {id:"22",username:"Abdudl",tipe:"siswa"},
]

function Items(props) { 
  const [filtered,setFiltered]=useState('');

 const check=(item)=>{
    return [...item].includes(filtered);
 }

  let items = props.currentItems.map((item)=> <tr>
  <th scope="row">{item.id}</th>
  <td>{item.username}</td>
  <td>{item.tipe}</td>
</tr>)
  let filteredItems = props.currentItems.filter(check(item));

  const filteredRow = filteredItems.map((item)=><tr>
  <th scope="row">{item.id}</th>
  <td>{item.username}</td>
  <td>{item.tipe}</td>
</tr>)
   
  

    return (
      <>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center '> <i className="bi bi-card-text me-2"> </i>
            Table with Hover</div>
            <div className='d-flex align-items-center '>{props.children}</div>
            </div>
           
          
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Tipe User</th>
                </tr>
              </thead>
              <tbody>
                {props.currentItems && !filtered && items}
                {filteredItems && filtered && filteredRow}
               
              </tbody>
            </Table>
          </CardBody>
         
        </Card>
      </Col>
      
      </>
    );
  }

function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(DUMMY_USER.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(DUMMY_USER.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % DUMMY_USER.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items currentItems={currentItems} >
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
        </Items>
      </>
    );
  }





export const UserPage = () => {






  return (
    <>
        <PaginatedItems itemsPerPage={5}/>
    </>
  )
}
