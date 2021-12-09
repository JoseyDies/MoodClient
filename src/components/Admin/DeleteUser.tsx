import { Component } from "react";
import {
    Button
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface DeleteUserProps {
    token: string,
    fetchUsers: Function,
    id: string
}



class DeleteUser extends Component<DeleteUserProps, {}> {
    constructor(props: DeleteUserProps) {
        super(props);
        this.state = {};
    }


    adminDeleteUser = () => {
        const deleteWarning = window.confirm("Are you sure you want to delete this user? This is a permanent action that cannot be undone.");
        if (deleteWarning) {
            let APIUrl = 'http://localhost:3000';
            fetch(`${APIUrl}/user/admin/delete/${this.props.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.props.fetchUsers()

                })
                .then(() => toast.success("Successfully deleted", {
                    position: toast.POSITION.TOP_CENTER
                  }))
                .catch(err => console.log(err));
            }}

    render() {
        return (
            <div>

               <ToastContainer />
               
                <Button onClick={(e) => this.adminDeleteUser()}>Delete User</Button>

            </div>
            
        )
    }
}

export default DeleteUser;