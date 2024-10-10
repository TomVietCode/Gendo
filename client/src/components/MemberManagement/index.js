import { Modal, Button, Space, Input, Form, Avatar, Tag, notification } from "antd"
import { PlusOutlined, UserOutlined } from "@ant-design/icons"
import { IoPersonAddSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react"
import "./style.scss"
import { get, patch } from "../../utils/request"
import { getTaskDetail } from "../../services/TaskService";

function MemberManagement({ token, taskId, createdBy }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [members, setMembers] = useState([])
  const [reload, setReload] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const cancelCloseModal = () => {
    setSearchValue("")
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTaskDetail(token, `${taskId}?members=true`)
      setMembers(result.members)
    }
    fetchApi()
  }, [reload])

  const handleInputChange = async (e) => {
    setSearchValue(e.target.value)
    if(searchValue === "") {
      setUsers([])
    }
    const result = await get(token, `user/list?keyword=${e.target.value}`)
    setUsers(result.users)
  }

  // Xử lý thêm thành viên
  const handleClickAdd = async (user) => {
    let isExist = true
    members.forEach(member => {
      if(user._id === member.id){
        notification.error({
          message: "This member is already in the group!",
          placement: "top",
          duration: 2,
        })
        isExist = false
        return
      }
    })

    if(!isExist) return
    
    const dataSubmit = { ...user, taskId: taskId}
    const result = await patch(token, "task/add-user", dataSubmit)
    if(result.code === 200){
      setReload(!reload)
      notification.success({
        message: "Added member successfully!",
        placement: "top",
        duration: 2,
      })
      setSearchValue("")
      setUsers([])
    }
  }

  return (
    <>
      <Button size="large" type="primary" onClick={openModal}>
        <PlusOutlined />
        Member Management
      </Button>
      <Modal
        title="Member Management"
        className="Modal"
        open={isModalOpen}
        onCancel={cancelCloseModal}
        footer={null}
      >
        <div className="find">
          <Input
            type="text"
            placeholder="Enter your member name"
            className="login__form-group-input form-control"
            onChange={handleInputChange}
            value={searchValue} 
          />
          {/* Hiển thị gợi ý */}
          {users.length > 0 && (
            <div className="suggestions">
              {users.map((user, index) => (
                <div key={index} className="suggestions__user">
                  <div className="avata">
                    <Avatar size={36} icon={<UserOutlined />} />
                  </div>
                  <div className="suggestions__info">
                    <p className="suggestions__fullname">{user.fullName}</p>
                    <p className="suggestions__email">{user.email}</p>
                  </div>
                <div className="suggestions__add" onClick={() => {handleClickAdd(user)}}>
                  <IoPersonAddSharp />
                </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p>Your team size: {members.length} members</p>
        </div>
        {members.map((user) => (
          <div className="infoUser" key={user.id}>
            <div className="avata">
              <Avatar size={48} icon={<UserOutlined />} />
            </div>
            <div className="Infor">
              <p>{user.fullName}</p>
              <p>{user.email}</p>
            </div>
            <div className="role">
              <Tag color={createdBy === user.id ? "red" : "green"}>
                {createdBy === user.id ? "Leader" : "Member"}
              </Tag>
            </div>
          </div>
        ))}
      </Modal>
    </>
  )
}

export default MemberManagement
