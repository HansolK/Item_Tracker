import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditItemModal from './EditItemModal'
import {ItemContext} from './Providers/ItemProvider'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function ItemsTable(props) {
  const itemProvider = useContext(ItemContext);
  const [sortBy, setSortBy] = useState("descending")
  const [selectedItem, setSelectedItem] = useState(null);
  const { classes, items } = props;

  const sortOrder = (items) => {
    if(sortBy === "descending") {
      return items.sort((a, b) => (a.rate > b.rate ? -1 : 1))
    } else {
      return items.sort((a, b) => (a.rate > b.rate ? 1 : -1))
    }
  }

  if (items.length === 0) {
    return <div>There are no items</div>
  }
 
  return (
    <>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell 
            className="onHover"
            onClick={() => {
              if(sortBy === "descending") {
                setSortBy("ascending")
              } else {
                setSortBy("descending")
              }
            }}>Rate{sortBy === "descending" ? <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/></svg>}</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            {props.showControls && (
              <TableCell>Controls</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortOrder(items).map((item,index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell>{item.rate}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.description}</TableCell>
              {props.showControls && (
              <TableCell>
                  <button
                  onClick={() => {
                    setSelectedItem(item)
                  }}
                  >
                    Edit
                    </button>
                    <button
                  onClick={e => {
                    itemProvider.deleteItem(item.id);
                  }}
                  >
                    delete
                    </button>
                </TableCell>
            )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    {selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

ItemsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemsTable);