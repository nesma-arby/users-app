import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.scss";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

const Home = () => {

  const [users, setUsers] = useState<any[]>([]);
  const [disabledState, setDisabledState] = useState(true);
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  interface IUser {
    id: string;
    name: string;
    mail: string;
    password: string;
  }

  const handleDelete = async (userId: any) => {
    await axios.delete(`http://localhost:3000/users/${userId}`);
    const result = users.filter((user) => user.id !== userId);
    console.log(result);
    setUsers(result);
  };

  const handleSelect = (userData: IUser) => {
    setName(userData?.name);
    setEmail(userData?.mail);
    setPassword(userData?.password);
    setId(userData?.id);
    setDisabledState(false);
  };

  const handleSaveEdit = async (userId: any) => {
    setDisabledState(true);

    await axios.put(`http://localhost:3000/users/${userId}`, {
      id: userId,
      name,
      mail,
      password,
    });

    const index: number = users.findIndex((object) => {
      return object.id === userId;
    });

    users[index] = { id: userId, name: name, mail: mail, password: password };

    setUsers([...users]);

    clearForm();
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

 
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    })();
  }, []);


  return users ? (
    <div className="wrapper">
      <ul>
        <h5 className="title">{t("allUsers")}</h5>
        {users?.map((user) => (
          <li key={user.id} data-testid="user">
            <div onClick={() => handleSelect(user)}>{user.name}</div>

            <Button
              variant="danger"
              type="button"
              onClick={() => handleDelete(user.id)}
            >
              {t("delete")}
            </Button>
          </li>
        ))}
      </ul>

      {/* **************************************************************** */}

      <Form className="updateForm">
        <h5 className="title">{t("updateUser")}</h5>

        <Form.Group className="mb-3">
          <Form.Label className="label">{t("userName")}</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">{t("email")}</Form.Label>
          <Form.Control
            type="email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="label">{t("password")}</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          disabled={disabledState}
          onClick={() => handleSaveEdit(id)}
        >
          {t("save")}
        </Button>
      </Form>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

export default Home;
