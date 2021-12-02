import React from 'react';


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
          
                
       
                <p>This is home.</p>
            </div>
          );
    }
}
 
export default Home;
