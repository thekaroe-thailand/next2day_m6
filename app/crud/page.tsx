//import { create } from "./action"
'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

interface ProductInterface {
    id: number
    name: string
    price: number
}

export default function Crud() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const url = '/api/product/list';
        const response = await axios.get(url);

        if (response.status === 200) {
            setProducts(response.data);
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: name,
            price: price
        }

        if (id === 0) {
            const url = '/api/product/create';
            await axios.post(url, payload);
        } else {
            const url = '/api/product/update/' + id;
            await axios.put(url, payload);
            setId(0);
        }

        setName('');
        setPrice(0);

        Swal.fire({
            title: 'save',
            text: 'success',
            icon: 'success',
            timer: 2000
        })

        fetchData();
    }

    const handleDelete = async (id: number) => {
        const button = await Swal.fire({
            title: 'ลบรายการ',
            text: 'ยืนยันการลบ',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        });

        if (button.isConfirmed) {
            const url = '/api/product/delete/' + id;
            await axios.delete(url);

            fetchData();
        }
    }

    const handleEdit = (product: ProductInterface) => {
        setName(product.name);
        setPrice(product.price);
        setId(product.id);
    }

    return (
        <div>
            <form onSubmit={handleSave} className="flex flex-col gap-2">
                <div>name</div>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <div>price</div>
                <input value={price} onChange={(e) => setPrice(Number(e.target.value))} />

                <div>
                    <button type="submit" className="btn">
                        <i className="fa fa-check mr-2"></i>
                        Save
                    </button>
                </div>
            </form>

            <div>Products</div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                        <th className="w-[150px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button className="btn" onClick={() => handleEdit(product)}>
                                        <i className="fa fa-pencil"></i>
                                    </button>
                                    <button className="btn" onClick={() => handleDelete(product.id)}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}