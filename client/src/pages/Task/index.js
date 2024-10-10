import { useEffect, useState } from "react"
import { Pagination } from "antd"
import "./style.scss"
import { getTaskList } from "../../services/TaskService"
import { getCookie } from "../../helpers/cookie"
import { useDispatch, useSelector } from "react-redux"
import ActionBar from "../../components/ActionBar"
import TaskList from "../../components/Task/TaskList"
import { loading } from "../../actions/TaskAction"

const Task = () => {
  const token = getCookie("tokenUser")
  const id = getCookie("id")
  const [data, setData] = useState([])
  const [reload, setReload] = useState(true)
  const state = useSelector((state) => state.TaskReducer)
  const dispatch = useDispatch()
  // Query
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  const [totalItems, setTotalItems] = useState(0) // Tổng số item từ backend
  const [limitItem, setLimitItem] = useState(0)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({})
  const [filter, setFilter] = useState("")
  
  const handleSearchChange = (value) => {
    setSearch(value)
    setReload(!reload)
  }

  const handleSortChange = (value) => {
    setSort({
      sortKey: value.sortKey,
      sortValue: value.sortValue,
    })
    setReload(!reload)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    setReload(!reload)
  }

  useEffect(() => {
    const fetchApi = async () => {
      let query = `?page=${currentPage}`

      if (search) {
        query += `&keyword=${search}`
      }

      if (sort.sortKey && sort.sortValue) {
        query += `&sortKey=${sort.sortKey}&sortValue=${sort.sortValue}`
      }

      if (filter) {
        query += `&status=${filter}`
      }
      
      setData([])
      dispatch(loading())
      const result = await getTaskList(token, query)
      setData(result)
      setTotalItems(result.totalItem)
      setLimitItem(result.limitItem)
      dispatch(loading())
    }
    fetchApi()
  }, [reload, state, currentPage])

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div style={{ padding: "24px" }}>
        <ActionBar
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <div style={{ paddingTop: "20px", padding: "10px" }}>
          <TaskList
            data={data}
            token={token}
            id={id}
            isSubTaskList={false}
          />
        </div>
        
        <Pagination
          className="pagination"
          current={currentPage} // Trang hiện tại
          total={totalItems} // Tổng số item từ backend
          pageSize={limitItem} // Số item trên mỗi trang
          onChange={handleChangePage} // Xử lý khi người dùng đổi trang
        />
      </div>
    </>
  )
}

export default Task
