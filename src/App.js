import './App.css';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React from 'react';
import axios from "axios";

export default class App extends React.Component {

    state = {
        persons: []
    }

    createProductData(id, name, description) {
        return {id, name, description};
    }

    constructor() {
        super();
        this.state = {
            productName: '',
            productDescription: '',
            productId: '',
            qty: 0,
            products: [],
            carts: []
        }
    }

    componentDidMount() {
        this.refreshProductData();
        this.refreshCartData();
    }

    refreshProductData() {
        axios.get(`http://localhost:8080/product`)
            .then(res => {
                const products = res.data;
                this.setState({products: products});
            })
    }

    refreshCartData() {
        axios.get(`http://localhost:8081/cart`)
            .then(res => {
                const carts = res.data;
                this.setState({carts: carts});
            })
    }

    saveProduct = () => {
        const product = {
            name: this.state.productName,
            description: this.state.productDescription
        }
        axios.post(`http://localhost:8080/product`, product)
            .then(res => {
                console.log(res);
                this.refreshProductData();
            })
    }

    saveCart = () =>{
        const cart = {
            productId: this.state.productId,
            qty: this.state.qty
        }
        axios.post(`http://localhost:8081/cart`, cart)
            .then(res => {
                console.log(res);
                this.refreshCartData();
            })
    }

    render() {
        return (
            <Grid container spacing={2} padding={10}>
                <Grid item xs={3}>
                    {/* ------- add product ------- */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '80%'},
                        }}
                        noValidate
                        autoComplete="off">
                        <Typography variant="h2" gutterBottom component="div">
                            Add Product
                        </Typography>
                        <TextField id="name" label="Name" variant="outlined"
                                   onChange={event => this.setState({productName: event.target.value})}/>
                        <TextField id="description" label="Description" variant="outlined"
                                   onChange={event => this.setState({productDescription: event.target.value})}/>
                        <Button size={"large"} variant="contained" onClick={this.saveProduct}>Save</Button>
                    </Box>
                    {/* ------- add to cart ------- */}
                    <Box
                        marginTop={5}
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '80%'},
                        }}
                        noValidate
                        autoComplete="off">
                        <Typography variant="h2" gutterBottom component="div">
                            Add to Cart
                        </Typography>
                        <TextField id="productId" label="Product Id" variant="outlined"
                                   onChange={event => this.setState({productId: event.target.value})}/>
                        <TextField id="total" label="Qty" variant="outlined"
                                   onChange={event => this.setState({qty: event.target.value})}/>
                        <Button size={"large"} variant="contained" onClick={this.saveCart}>Save</Button>
                    </Box>
                </Grid>

                <Grid item xs={4} padding={10}>
                    <Typography variant="h4" gutterBottom component="div">
                        Our Products
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.products.map((row) => (
                                    <TableRow
                                        key={row.id}>
                                        <TableCell align="left" width={20}>{row.id}</TableCell>
                                        <TableCell align="right" width={100}>{row.name}</TableCell>
                                        <TableCell align="right" width={200}>{row.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={5} padding={10}>
                    <Typography variant="h4" gutterBottom component="div">
                        Your Cart
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Product</TableCell>
                                    <TableCell align="right">Qty</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.carts.map((row) => (
                                    <TableRow
                                        key={row.id}>
                                        <TableCell align="left" width={20}>{row.id}</TableCell>
                                        <TableCell align="right" width={200}>
                                            {JSON.stringify(row.product, null, 2)}
                                        </TableCell>
                                        <TableCell align="right" width={50}>{row.qty}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        );
    }
}
