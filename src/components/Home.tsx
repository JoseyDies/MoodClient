import React from 'react';
import Nav from './Nav';

export interface HomeProps {
    token: string,
        // clearToken: Function
    
}
 
export interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {};
    }


    render() { 
        return (
            <div>
                <Nav />
                
       
                <p>This is home.</p>
            </div>
          );
    }
}
 
export default Home;
