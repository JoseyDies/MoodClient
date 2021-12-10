import React from 'react';
import './Home.css';




type HomeProps = {
    token: string,
    // firstName: string
}

type UserName = {

    // firstName: string,

}




class Home extends React.Component<HomeProps, UserName> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            //    firstName: this.state.firstName
        };

    }


    render() {

        return (
            <div className='homeContainer'>
                <div >

                    <p>Hello there,</p>
                    <p className='offsetHeader'>how's the day for you?</p>


                </div>
            </div>
        );
    }
}

export default Home;
