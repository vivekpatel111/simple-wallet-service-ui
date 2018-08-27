import React, {Component} from 'react';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Table from "../../../node_modules/@material-ui/core/Table/Table";
import TableBody from "../../../node_modules/@material-ui/core/TableBody/TableBody";
import TableRow from "../../../node_modules/@material-ui/core/TableRow/TableRow";
import TableCell from "../../../node_modules/@material-ui/core/TableCell/TableCell";
import Paper from "../../../node_modules/@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";


class Transactions extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const transactions = this.props.transactions || [];
        const walletId = this.props.walletId;

        if (!transactions || !transactions.length) {
            return null;
        }

        return (
            <Paper className="wallet-info-card">
                <Table className="wallet-info-table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography component="p">
                                    Txn ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="p">
                                    Txn Date
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="p">
                                    Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="p">
                                    Amount
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="p">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component="p">
                                    Message
                                </Typography>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                        {
                            transactions.map((txn) => (
                                <TableRow>
                                    <TableCell>
                                        <Typography component="p">
                                            {txn.id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="p">
                                            {new Date(txn.transactionDate).toString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="p">
                                            {txn.type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="p">
                                            {txn.amount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="p">
                                            {txn.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography component="p">
                                            {txn.message}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button size="small"
                                                onClick={() => this.props.cancelTransaction(walletId, txn.id)}>
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Transactions.propTypes = {
    walletId: PropTypes.string.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        transactionDate: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired
    })),
    cancelTransaction: PropTypes.func.isRequired
};

Transactions.defualtProps = {
    transactions: [],
    cancelTransaction: () => {}
};

export default Transactions;
