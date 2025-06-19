import { useEffect, useState } from "react";
import { api } from "./api/api";
import { Header } from "antd/es/layout/layout";
import { Card, Avatar, Tag, Button, Modal, Form, Input, } from "antd";

const { Meta } = Card;


const App = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [createLoading, setCreateLaoding] = useState(false);

  const onFinish = values => {
    setCreateLaoding(true);
    if (editItem) {
      // update
      api
        .put(`/drinks/${editItem.id}`, values)
        .then(() => setEditItem(null))
        .catch()
        .finally(() => setCreateLaoding(false));
    } else {
      // create
      api
        .post("/drinks", values)
        .then()
        .catch()
        .finally(() => setCreateLaoding(false));
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleDelete = (id) => {
    api.delete(`/drinks/${id}`);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    api.get("/drinks").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Header style={{ backgroundColor: "#001529", padding: "0 20px", }}>
        <div className="flex items-center justify-between container mx-auto">
          <div style={{ color: "white", fontSize: "20px", float: "left" }}>
            Json Server
          </div>
          <Button type="primary" style={{ background: "green" }} onClick={showModal}>Add drinks</Button>
        </div>
      </Header>

      <h2 className="text-center my-10 text-4xl font-semibold">Drinks</h2>

      <div className="container mx-auto flex flex-wrap justify-center gap-[30px]">
        {data?.map((item, i) => (
          <Card
            key={i}
            style={{ width: 300 }}
            cover={
              <img
                alt={item.title}
                src={item?.image}
                style={{
                  maxHeight: 300,
                  objectFit: "cover",
                  padding: 20,
                  borderRadius: 12,
                }}
              />
            }

          >
            <Meta
              avatar={<Avatar src={item.image} />}
              title={
                <span className="font-bold text-lg">{item?.title}</span>
              }
              description={
                <div className="text-sm">
                  <p className="text-gray-700">
                    <strong>Company:</strong> {item.company_name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Volume:</strong> {item.volume}
                  </p>
                  <p className="text-gray-700">
                    <strong>Price:</strong> {item.price} so'm
                  </p>
                  <p className="text-gray-700">
                    <strong>Type:</strong>{" "}
                    <Tag color={item.type === "gazli" ? "blue" : "green"}>
                      {item.type}
                    </Tag>
                  </p>
                </div>
              }
            />
            <div className="mt-[1.5rem] flex gap-3">
              <Button>Edit </Button>
              <Button danger>Delete </Button>
            </div>

          </Card>
        ))}
      </div>

      {isModalOpen && (
      <Modal
        title="Create a new drink"
        open={isModalOpen}
        footer={false}
        onOk={handleOk}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please, enter title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company name"
            name="company_name"
            rules={[{ required: true, message: 'Please, enter company!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please, enter price!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Volume"
            name="volume"
            rules={[{ required: true, message: 'Please, enter volume!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please, enter type!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please, enter image URL!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      )}
    </div>
  );
};

export default App;
