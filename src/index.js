import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class RouterApp extends Component {
    constructor(props){
        super(props);
        this.headline = '';
        this.state = {
            chapters: []
        }
    }

    componentDidMount(){
        fetch("https://cwpeng.github.io/live-records-samples/data/content.json").then(
            response => {
                return response.json()
            }
        ).then(res => {
            this.headline = res.headline;
            this.setState({
                chapters: res.chapters
            })
        })
    }


    render() { 
        return ( 
            <Router>
                <div>
                    <nav>
                        <ChaptersLinks chapters = { this.state.chapters } />
                    </nav>
                    <Switch>
                        <Route exact path = "/">
                            <Headline headline = { this.headline }/>
                        </Route>
                        <ChaptersRoutes chapters = { this.state.chapters } headline = { this.headline } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const ChaptersLinks = (props) => {
    let id = 0;
    return(
        props.chapters.map(chapter => {
            id++;
            return (
                <div key = { id }>
                    <h1>
                        <Link to = { '/' + chapter.key }>{ chapter.title }</Link>
                    </h1>
                </div>
            )
        })
    )
}


const ChaptersRoutes = (props) => {
    let routeId = 10;
    let contentId = 0;
    return (
        props.chapters.map(chapter => {
            routeId++;
            return (
                <Route path = { "/" + chapter.key } key = { routeId }>
                    <ul>
                        { chapter.sections.map(item => {
                            contentId++;
                            return (
                                <li key = { contentId }>{ item }</li>
                            )
                        }) }
                    </ul>
                    <HomePage /> 
                </Route>
            )
        })
    )
}


const HomePage = (props) => {
    return (
        <div>
            <h1>
                <Link to = "/">回首頁</Link>
            </h1>
        </div>
    )
}

const Headline = (props) => {
    return (
        <div>
            <h1>{ props.headline }</h1>
        </div>
    )
}
 
ReactDOM.render(<RouterApp />, document.getElementById('root'));