import React from 'react'
import './Track.css'

class Track extends React.Component {
    addTrack = () => {
        this.props.onAdd(this.props.track);
      }
    
      removeTrack = () => {
        this.props.onRemove(this.props.track);
      }
    
      renderAction() {
        if (this.props.isRemoval) {
          return <button onClick={this.removeTrack}>-</button>;
        } else {
          return <button onClick={this.addTrack}>+</button>;
        }
      }
    
      render() {
        return (
          <div>
            <p>{this.props.track.name} - {this.props.track.artist} - {this.props.track.album}</p>
            {this.renderAction()}
          </div>
        );
      }
}

export default Track;