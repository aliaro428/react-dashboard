import React, { Component } from 'react';

export default class CustomToolTip extends Component {
    render() {
        const { active, payload, label } = this.props;
        return active ? (
            <div className="custom-tooltip">
                <p className="tooltip-label">{`${label}`}</p>
				<ToolTipData {...payload[0]} />
				<hr />
				<ToolTipData {...payload[1]} />
				<hr />
				<ToolTipData {...payload[2]} />
				<hr />
				<ToolTipData {...payload[3]} />
            </div>
        ) : null;
        
    }
}

const ToolTipData = (payload) =>{
	var currentAvg = payload.payload.amt.price / payload.value;
    currentAvg = currentAvg.toFixed(2);
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th style={{color: payload.stroke }} >
							{payload.name}
						</th>
						<td>{payload.payload.amt.date}</td>
						<td>@</td>
						<th>${payload.payload.amt.price}</th>
					</tr>
				</tbody>
			</table>
			<table>
				<tbody>
					<tr>
						<th>Units: </th>
						<td>{payload.value}</td>
						<th>Full: </th>
						<td>{payload.payload.amt.full}</td>
						<th>Promos: </th>
						<td>{payload.payload.amt.promos}</td>
						<th>Avg: </th>
						<td>{currentAvg}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}