import { Input } from "antd"
import "./style.scss"
import { TreeSelect, Button } from "antd"
import { FaDotCircle } from "react-icons/fa"
import { GrPowerReset } from "react-icons/gr"
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { useState } from "react"
const { Search } = Input

const filter = [
  {
    value: "status",
    title: "Role",
    children: [
      {
        value: "leader",
        title: "Leader",
      },
      {
        value: "member",
        title: "Member",
      },
    ],
  },
  {
    value: "status",
    title: "Status",
    children: [
      {
        value: "initial",
        title: (
          <span>
            <FaDotCircle style={{ marginRight: 8, color: "blue" }} />
            Initial
          </span>
        ),
      },
      {
        value: "doing",
        title: (
          <span>
            <FaDotCircle style={{ marginRight: 8, color: "orange" }} />
            Doing
          </span>
        ),
      },
      {
        value: "pending",
        title: (
          <span>
            <FaDotCircle style={{ marginRight: 8, color: "yellow" }} />
            Pending
          </span>
        ),
      },
      {
        value: "finished",
        title: (
          <span>
            <FaDotCircle style={{ marginRight: 8, color: "green" }} />
            Finished
          </span>
        ),
      },
      {
        value: "notFinish",
        title: (
          <span>
            <FaDotCircle style={{ marginRight: 8, color: "red" }} />
            Not Finished
          </span>
        ),
      },
    ],
  },
]

const sort = [
  {
    value: "timeFinish_asc",
    title: "Deadline Ascending",
  },
  {
    value: "timeFinish_desc",
    title: "Deadline Descending",
  },
  {
    value: "timeStart_asc",
    title: "Time Start Ascending",
  },
  {
    value: "timeStart_desc",
    title: "Time Start Descending",
  },
  {
    value: "title_asc",
    title: (
      <span>
        Name
        <AiOutlineSortAscending
          style={{ marginLeft: "10px", fontSize: "1rem" }}
        />
      </span>
    ),
  },
  {
    value: "title_desc",
    title: (
      <span>
        Name
        <AiOutlineSortDescending
          style={{ marginLeft: "10px", fontSize: "1rem" }}
        />
      </span>
    ),
  },
]

function ActionBar(props) {
  const { onSearchChange, onSortChange, onFilterChange } = props

  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState(undefined);
  const [sortValue, setSortValue] = useState(undefined);

  const handleSearchInput = (value) => {
    setSearchValue(value);
    onSearchChange(value)
  }

  const handleSortSelect = (value) => {
    const sortQuery = value.split("_")
    setSortValue(value);
    onSortChange({
      sortKey: sortQuery[0],
      sortValue: sortQuery[1],
    })
  }

  const handleFilterSelect = (value) => {
    setFilterValue(value);
    onFilterChange(value)
  }

  const handleReset = () => {
    setSearchValue(""); // Reset giá trị Search
    setFilterValue(undefined); // Reset giá trị TreeSelect
    setSortValue(undefined);
    onSearchChange("")
    onSortChange({})
    onFilterChange("")
  }
  return (
    <>
      <div className="container">
        <div className="resetButton">
          <Button onClick={handleReset}>
            <GrPowerReset /> Reset
          </Button>
        </div>
        <div className="filter">
          <p>Filter</p>
          <div className="Box-Filter">
            <TreeSelect
              style={{
                width: "100%",
              }}
              dropdownStyle={{
                maxHeight: 500,
                overflow: "auto",
              }}
              treeData={filter}
              placeholder="Please select"
              value={filterValue}
              treeDefaultExpandAll
              onChange={handleFilterSelect}
            />
          </div>
        </div>
        <div className="sort">
          <p>Sort</p>
          <div className="Box-Sort">
            <TreeSelect
              style={{
                width: "100%",
              }}
              dropdownStyle={{
                maxHeight: 500,
                overflow: "auto",
              }}
              treeData={sort}
              placeholder="Please select"
              value={sortValue}
              treeDefaultExpandAll
              onChange={handleSortSelect}
            />
          </div>
        </div>
        <div className="box-search ">
          <Search
            placeholder="Search "
            style={{
              width: 200,
            }}
            value={searchValue}
            onSearch={handleSearchInput}
            onChange={(e) => {setSearchValue(e.target.value)}}
          />
        </div>
      </div>
    </>
  )
}

export default ActionBar
