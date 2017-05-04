import React from 'react';
import { Image, ActivityIndicator, View } from 'react-native';

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
    if (this.props.isIndicator && !this.shouldRenderImage()) {
      return (
        <ActivityIndicator
          size={this.props.loadingStyle ? this.props.loadingStyle.size : 'small'}
          color={this.props.loadingStyle ? this.props.loadingStyle.color : 'gray'}
          style={[this.props.style, styles.image]}
        />
      );
    }
    return null;
  }

  shouldRenderImage() {
    return this.state.isLoaded && !this.state.isError;
  }

  renderPlaceHolder() {
    if (this.shouldRenderImage()) {
      return null;
    }
    return (
      <Image
        style={[this.props.style, styles.image]}
        source={this.props.placeholderSource ? this.props.placeholderSource : require('./Images/empty-image.png')}
      />
    );
  }

  render() {
    return(
      <View style={this.props.containerStyle}>
      {this.renderPlaceHolder()}
        <Image
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={[this.props.style, styles.image, {opacity: this.state.isLoaded ? 1 : 0}]}
          source={this.props.source}
        />
        {this.renderIndicator()}
      </View>
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
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0
  }
}

export default ImageLoad;
