import React from 'react';
import { Image, ActivityIndicator } from 'react-native';

class ImageLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd(){
    this.setState({
      isLoaded: true
    });
  }

  onError(){
    this.setState({
      isError: true
    });
  }

  renderIndicator() {
    if (this.props.isIndicator) {
      return (
        <ActivityIndicator
          size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
          color={this.props.loadingStyle ? this.props.loadingStyle.color : 'gray'}
        />
      );
    }
    return null;
  }

  render() {
    return(
      <Image
        onLoadEnd={this.onLoadEnd.bind(this)}
        onError={this.onError.bind(this)}
        style={[this.props.style, { alignItems: 'center' }]}
        source={this.props.source}
      >
        {
          this.state.isLoaded && !this.state.isError ? null :
          <Image
            style={[styles.imagePlaceholderStyles, this.props.placeholderStyle]}
            source={this.props.placeholderSource ? this.props.placeholderSource : require('./Images/empty-image.png')}
          >
            {this.props.children ? this.props.children : this.getIndication()}
          </Image>
        }
      </Image>
    );
  }
}

ImageLoad.defaultProps = {
  isIndicator: true
};

const styles = {
  imagePlaceholderStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
}

export default ImageLoad;
