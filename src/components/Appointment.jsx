import AppointmentForm from "./AppointmentForm";
import SuccessMessage from "./SuccessMessage";
import { useState, useEffect } from "react";
import { Button, Table, Modal, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Appointment = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const { Title } = Typography;

  useEffect(() => {
    console.log("Retrieving data from local storage...");
    const storedDataSource = localStorage.getItem("dataSource");
    if (storedDataSource) {
      setDataSource(JSON.parse(storedDataSource));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataSource", JSON.stringify(dataSource));
  }, [dataSource]);

  const onAddAppointment = () => {
    setIsAdding(true);
    setEditingAppointment({
      id: null,
      firstName: null,
      lastName: null,
      reason: null,
      address: null,
      appointmentDate: null,
      appointmentTime: null,
    });
  };

  {
    /* show Modal to delete an appointment */
  }
  const onDeleteAppointment = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete appointment record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        SuccessMessage.successDeleteMessage();
        setDataSource((pre) => {
          return pre.filter((appointment) => appointment.id !== record.id);
        });
      },
    });
  };

  const onEditAppointment = (record) => {
    setIsEditing(true);
    setEditingAppointment({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingAppointment(null);
  };

  // Table columns
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "3",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "4",
      title: "Reason",
      dataIndex: "reason",
    },
    {
      key: "5",
      title: "Adress",
      dataIndex: "address",
    },
    {
      key: "6",
      title: "Appointment Date",
      dataIndex: "appointmentDate",
    },
    {
      key: "7",
      title: "Appointment Time",
      dataIndex: "appointmentTime",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditAppointment(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteAppointment(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="App">
        <header className="App-header">
          <Title>DX LANG MAY MEDICAL APPOINTMENT</Title>
          <Button onClick={onAddAppointment}>ADD APPOINTMENT</Button>
          <Table columns={columns} dataSource={dataSource}></Table>
          {/* Modal for editing appointment */}
          <Modal
            title="Edit Appointment"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              SuccessMessage.successEditMessage();
              setDataSource((pre) => {
                return pre.map((appointment) => {
                  if (appointment.id === editingAppointment.id) {
                    return editingAppointment;
                  } else {
                    return appointment;
                  }
                });
              });
              resetEditing();
            }}
          >
            {/* AppointmentForm component */}
            {editingAppointment && (
              <AppointmentForm
                editingAppointment={editingAppointment}
                setEditingAppointment={setEditingAppointment}
              />
            )}
          </Modal>

          {/* Modal for adding appointment */}
          <Modal
            title="Add Appointment"
            open={isAdding}
            okText="Save"
            onCancel={() => {
              setIsAdding(false);
            }}
            onOk={() => {
              SuccessMessage.successAddMessage();
              setDataSource((prevDataSource) => {
                const newAppointment = {
                  id:
                    prevDataSource.length === 0
                      ? 1
                      : prevDataSource[prevDataSource.length - 1].id + 1,
                  firstName: editingAppointment.firstName,
                  lastName: editingAppointment.lastName,
                  reason: editingAppointment.reason,
                  address: editingAppointment.address,
                  appointmentDate: editingAppointment.appointmentDate,
                  appointmentTime: editingAppointment.appointmentTime,
                };
                return [...prevDataSource, newAppointment];
              });
              setIsAdding(false);
            }}
          >
            {/* AppointmentForm component */}
            {editingAppointment && (
              <AppointmentForm
                editingAppointment={editingAppointment}
                setEditingAppointment={setEditingAppointment}
              />
            )}
          </Modal>
        </header>
      </div>
    </>
  );
};

export default Appointment;
