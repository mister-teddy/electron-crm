import Counter from './Counter.js'

const App = props => {
    return div(
        ul([
            li.key(1)('Feed the dog'),
            li.key(2)('Find a job'),
            li.key(3)('Publish this lib to npm'),
        ]),
        Counter.key('counter')(),
        DatePicker({
            value: null
        })
    )
}

export default nojsx(App)