import React from 'react';
import DeleteUser from './DeleteUser';


type GetUsersState = {
    users: UserInfo[]
}

type GetUsersProps = {
    token: string,
    role: string
}

type UserInfo = {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
}


class Admin extends React.Component<GetUsersProps, GetUsersState> {
    constructor(props: GetUsersProps) {
        super(props);
        this.state = {
            users: [],
        }
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    fetchUsers() {
        let APIUrl = 'http://localhost:3000';
        fetch(`${APIUrl}/user/admin/allusers`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.token,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log("Response:", response);
                this.setState({
                    users: response
                });
                console.log("Users:", this.state.users);
            })
            .catch((error) => console.log("fetchUsers Error:", error))
    }

    render() {
        return (
            <div>

                <button onClick={this.fetchUsers}>View all users</button>
                {this.state.users.map((userInfo: UserInfo, index: number) => {
                    return (
                        <div key={index}>

                            {userInfo.id}
                            <br />
                            {userInfo.email}
                            <br />
                            {userInfo.password}
                            <br />
                            {userInfo.firstName}
                            <br />
                            {userInfo.lastName}
                            <br />
                            {userInfo.role}
                            <br />
                            <DeleteUser token={this.props.token} fetchUsers={this.fetchUsers} id={userInfo.id} />

                        </div>
                    )
                })}

                <p>This is the admin page. No users allowed.</p>
            </div>
        );
    }
}

export default Admin;

