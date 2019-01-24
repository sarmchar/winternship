import React from "react";
import axios from 'axios';
import { Chart } from 'react-google-charts'
import { Button, Grid, Row, Col } from "react-bootstrap";


export default class WordChart extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          data: [],
      };
  }

  async componentDidMount() {
    const data = await this.getData('wordcount');
    this.setState({data: data});
  }

  async getData(endpoint) {
      const res = await axios.get(`http://127.0.0.1:5000/api/${endpoint}`);
      const temp = res.data.shift();
      res.data.forEach((arr)=> {
        arr[0]=parseInt(arr[0]);
        arr[1]=parseInt(arr[1]);
      });

      res.data.unshift(temp);
      console.log('Response', res)

      return res.data;
  }

  render() {
      return (
          <div>
              <Chart
                chartType="BarChart"
                data ={this.state.data}
                height = {'500px'}
                options={{
                  hAxis: {
                    title: '# of Creatives',
                    max: 720
                  },
                  vAxis: {
                    title: 'Word Count',
                    max: 90
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
          </div>
      );
  }
}
