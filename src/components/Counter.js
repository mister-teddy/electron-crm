export default nojsx(props => {
    const [counter, setCounter] = React.useState(0)
    return Button.props({ onClick: () => setCounter(counter + 1) })(counter)
})