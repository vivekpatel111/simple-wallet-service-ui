import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Wallet from "./components/wallet/App.js";
import Snackbar from "../node_modules/@material-ui/core/Snackbar/Snackbar";
import Transactions from "./components/transactions/App";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletId: "",
            wallet: {},
            transactions: [],
            amount: "",
            showMessage: false,
            messageText: null,
            messageType: null
        };

        this.showMessage = this.showMessage.bind(this);
        this.closeMessage = this.closeMessage.bind(this);

        this.createWallet = this.createWallet.bind(this);
        this.getWalletInfo = this.getWalletInfo.bind(this);
        this.listTransactions = this.listTransactions.bind(this);
        this.cancelTransaction = this.cancelTransaction.bind(this);
    }

    showMessage(message, type="success") {
        this.setState({
            showMessage: true,
            messageText: message,
            messageType: type
        });
    }

    closeMessage() {
        this.setState({
            showMessage: false,
            messageText: null,
            messageType: null
        });
    }

    getWalletInfo(walletId) {
        fetch(`/api/wallet/${walletId}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if ("OK" === response.message) {
                this.showMessage("Wallet fetched successfully.");
                this.setState({
                    wallet: response.wallet
                });
            } else {
                this.showMessage(`[${response.code}] ${response.message}`, "error");
            }
        }.bind(this)).catch(function (error) {
            this.showMessage(`[${error.code}] ${error.message}`, "error");
        }.bind(this));
    }

    listTransactions(walletId) {
        fetch(`/api/wallet/${walletId}/transaction`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            if ("OK" === response.message) {
                this.showMessage("Transaction fetched successfully.");
                this.setState({
                    transactions: response.transactions
                });
            } else {
                this.showMessage(`[${response.code}] ${response.message}`, "error");
            }
        }.bind(this)).catch(function (error) {
            this.showMessage(`[${error.code}] ${error.message}`, "error");
        }.bind(this));
    }

    createWallet(type) {
        const createRequest = { type };

        fetch("/api/wallet/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(createRequest)
        })
        .then(response => response.json())
        .then(function(response) {
            if ("OK" === response.message) {
                this.showMessage("Wallet created successfully.");
                this.setState({
                    wallet: response.wallet
                });
            } else {
                this.showMessage(`[${response.code}] ${response.message}`, "error");
            }
        }.bind(this)).catch(function (error) {
            this.showMessage(`[${error.code}] ${error.message}`, "error");
        }.bind(this));
    }

    postTransaction(walletId, amount, type) {
        const transactionRequest = { amount, type };

        fetch(`/api/wallet/${walletId}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(transactionRequest)
        })
        .then(response => response.json())
        .then(function(response) {
            if ("OK" === response.message) {
                this.showMessage(`Transaction status - ${response.transaction.status}`);
                this.setState({
                    wallet: response.wallet
                }, this.listTransactions.bind(this, walletId));
            } else {
                this.showMessage(`[${response.code}] ${response.message}`, "error");
            }
        }.bind(this)).catch(function (error) {
            this.showMessage(`[${error.code}] ${error.message}`, "error");
        }.bind(this));
    }

    cancelTransaction(walletId, transactionId) {
        fetch(`/api/wallet/${walletId}/transaction/${transactionId}`, {method: "DELETE"})
        .then(response => response.json())
        .then(function(response) {
            if ("OK" === response.message) {
                this.showMessage(`Transaction status - ${response.transaction.status}`);
                this.setState({
                    wallet: response.wallet
                }, this.listTransactions.bind(this, walletId));
            } else {
                this.showMessage(`[${response.code}] ${response.message}`, "error");
            }
        }.bind(this)).catch(function (error) {
            this.showMessage(`[${error.code}] ${error.message}`, "error");
        }.bind(this));
    }

    render() {
        const {showMessage, messageText, messageType, wallet, walletId, amount, transactions} = this.state;

        return (
            <React.Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Simple Wallet
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="container">
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <TextField
                                label="Enter Wallet Id"
                                className="text-box wallet-id-text-box"
                                margin="normal"
                                value={walletId}
                                onChange={(event) => this.setState({walletId: event.target.value})}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className="get-wallet-button"
                                    onClick={() => this.getWalletInfo(walletId)} disabled={!walletId}>
                                Get Wallet Info
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className="create-wallet-button"
                                    onClick={() => this.createWallet("REGULAR")}>
                                Create Regular Wallet
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" className="create-wallet-button"
                                    onClick={() => this.createWallet("OVERDRAFT")}>
                                Create Overdraft Wallet
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} alignItems="flex-end">
                        <Grid item xs={6}>
                            <Wallet wallet={wallet} refreshWalletData={() => this.getWalletInfo(wallet.id)}/>
                        </Grid>
                    </Grid>
                    {
                        wallet && wallet.id &&
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <TextField
                                    label="Enter Amount"
                                    className="text-box wallet-id-text-box"
                                    margin="normal"
                                    value={amount}
                                    onChange={(event) => this.setState({amount: event.target.value})}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" className="transaction-post-button"
                                        onClick={() => this.postTransaction(wallet.id, Number(amount), "CREDIT")}
                                        disabled={!amount || isNaN(amount)} >
                                    Credit Wallet
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" className="transaction-post-button"
                                        onClick={() => this.postTransaction(wallet.id, Number(amount), "DEBIT")}
                                        disabled={!amount || isNaN(amount)} >
                                    Debit Wallet
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" className="list-transaction-button"
                                        onClick={() => this.listTransactions(wallet.id)} disabled={!wallet.id}>
                                    Get Wallet Transactions
                                </Button>
                            </Grid>
                            <Grid item>
                                <Transactions transactions={transactions} walletId={wallet.id}
                                              cancelTransaction={this.cancelTransaction}/>
                            </Grid>
                        </Grid>
                    }
                </div>
                <Snackbar
                    className={`message-${messageType}`}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={showMessage}
                    onClose={this.closeMessage}
                    message={<span id="error-message">{messageText}</span>}
                />
            </React.Fragment>
        );
    }
}

export default App;
