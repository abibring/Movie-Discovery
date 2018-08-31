import React from 'react';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        {console.log(this.props.faves)}
        {this.props.faves.map(fav => {
          <div>
            {fav.title}
            <br />
            {fav.description}
          </div>
        })}
      </div>
    )
  }
}

export default Favorites;
