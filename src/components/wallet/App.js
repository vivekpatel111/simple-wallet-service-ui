import React, {Component} from 'react';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from "../../../node_modules/@material-ui/core/Table/Table";
import TableBody from "../../../node_modules/@material-ui/core/TableBody/TableBody";
import TableRow from "../../../node_modules/@material-ui/core/TableRow/TableRow";
import TableCell from "../../../node_modules/@material-ui/core/TableCell/TableCell";


class Wallet extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const wallet = this.props.wallet || {};

        return (
            <Card className="wallet-info-card">
                <CardContent>
                    <Table className="wallet-info-table">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography component="p">
                                        Wallet ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {wallet.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >
                                    <Typography component="p">
                                        Wallet Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {wallet.type}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >
                                    <Typography component="p">
                                        Balance
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {wallet.balance}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell >
                                    <Typography component="p">
                                        Status
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {wallet.status}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardActions className="wallet-info-action">
                    <Button size="small" onClick={this.props.refreshWalletData} disabled={!wallet.id}>
                        Refresh Balance
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

Wallet.propTypes = {
    wallet: PropTypes.shape({
        id: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }),
    refreshWalletData: PropTypes.func
};

Wallet.defualtProps = {
    wallet: {},
    refreshWalletData: () => {}
};

export default Wallet;
