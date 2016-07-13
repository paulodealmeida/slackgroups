var DisplayGroups = React.createClass({

    render() {
            var groups = this.props.groups.map((group) => {
                return (
                    <div key={group.id}>
                        {group.id}
                    </div>
                )
            });

        return(
            <div>
                {groups}
            </div>
        )
    }
});