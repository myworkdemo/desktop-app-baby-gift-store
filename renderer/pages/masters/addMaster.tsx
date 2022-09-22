import React, { useState } from "react";
import { MainLayout } from "../../components/layout";
import MainCard from "../../components/cards/MainCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserFormData {
  userName: String;
  userEmailId: String;
  userPassword: String;
  userRole: String;
  isActive: Boolean;
  createdDate: Date;
  profilePhoto: String;
}

const Master = ({ data }) => {
  const [userForm, setUserForm] = useState<UserFormData>();
  const [imgURL, setImgURL] = useState("");

  async function create(data: UserFormData) {
    console.log("##profilePhoto_2 : ", data);
    console.log("##profilePhoto_stringify : ", JSON.stringify(data));
    try {
      fetch("/api/users", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: UserFormData) => {
    console.log("## handleSubmit() : ");
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDate = (e) => {
    var date = new Date(e.target.value);
    setUserForm({ ...userForm, createdDate: date });
  };

  const onChangeFile = async (e) => {
    if (e) {
      let files = e.target.files;
      var imageUrl = URL.createObjectURL(files[0]);
      // setImgURL(imageUrl);
      console.log("imageUrl : ", files[0]);

      const base64String = await convertBlobToBase64(files[0]);
      setImgURL(imageUrl);
      setUserForm({ ...userForm, profilePhoto: base64String.toString() });
    }
  };

  const convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  return (
    <div>
      <MainCard title="Add Master">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userForm);
          }}
        >
          <table border={1}>
            <tbody>
              <tr>
                <th>Name</th>{" "}
                <td>
                  {" "}
                  <input
                    onChange={(e) =>
                      setUserForm({ ...userForm, userName: e.target.value })
                    }
                  />{" "}
                </td>
              </tr>
              <tr>
                <th>Email Id</th>{" "}
                <td>
                  {" "}
                  <input
                    onChange={(e) =>
                      setUserForm({ ...userForm, userEmailId: e.target.value })
                    }
                  />{" "}
                </td>
              </tr>
              <tr>
                <th>Password</th>{" "}
                <td>
                  {" "}
                  <input
                    type="password"
                    onChange={(e) =>
                      setUserForm({ ...userForm, userPassword: e.target.value })
                    }
                  />{" "}
                </td>
              </tr>
              <tr>
                <th>Role</th>{" "}
                <td>
                  {" "}
                  <input
                    onChange={(e) =>
                      setUserForm({ ...userForm, userRole: e.target.value })
                    }
                  />{" "}
                </td>
              </tr>
              <tr>
                <th>Is Active</th>{" "}
                <td>
                  {" "}
                  <input
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        isActive: e.target.value === "true" ? true : false,
                      })
                    }
                  />{" "}
                </td>
              </tr>
              <tr>
                <th>Date</th>{" "}
                <td>
                  {" "}
                  <input type="date" onChange={onChangeDate} />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    type="file"
                    onChange={onChangeFile}
                    id="profile_pic"
                    name="profile_pic"
                    accept=".jpg,.jpeg,.png"
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>

          <input type="submit" name="Save" />
        </form>

        <div className="file-upload">
          <img src={imgURL} height="200px" width="300px" />
        </div>

        <table border={1} style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email Id</th>
            </tr>
          </thead>

          <tbody>
            {data.map((val, idx) => (
              <tr key={idx}>
                <td>{val.userId}</td>
                <td>{val.userName}</td>
                <td>{val.userEmailId}</td>
                <td>
                  {<img src={val.profilePhoto} height="200px" width="300px" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MainCard>
    </div>
  );
};

export default Master;

Master.Layout = MainLayout;

export async function getStaticProps() {
  const userList = await prisma.user.findMany();
  console.log("USER LIST : ", userList);
  return {
    props: {
      data: JSON.parse(JSON.stringify(userList)),
    },
  };
}
