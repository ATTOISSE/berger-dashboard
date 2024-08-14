import { useEffect, useState } from "react"
import { postBerger, putBerger } from "../../../services/productService"
import { toast, ToastContainer } from "react-toastify"
import { useLocation } from "react-router-dom"

export function FormBerger() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [bergers, setBergers] = useState('')
    const location = useLocation()
    const { berger } = location.state || { berger: {} }

    const handleClear = () => {
        setDescription('')
        setName('')
        setPrice('')
    }

    const handleAdd = (e) => {
        e.preventDefault();

        if (name.trim() !== '') {
            const berge = { name, price, description };
            const b = berger[0] 
            if (b && b.id) {
                putBerger(b.id, berge)
                    .then(response => {
                        setBergers(bergers.map(berg => berg.id === b.id ? response.data : berg));
                        toast("Le berger a été modifié avec succès !!!");
                    })
                    .catch(error => {
                        console.error("Erreur lors de la mise à jour du berger", error);
                        toast("Le berger a été modifié avec succès !!!.");
                    });
            } else {
                postBerger(berge)
                    .then(response => {
                        setBergers([...bergers, response.data]);
                        toast("Le berger a été ajouté avec succès !!!");
                    })
                    .catch(error => {
                        console.error("Erreur lors de l'ajout du berger", error);
                        toast("Une erreur s'est produite lors de l'ajout du berger.");
                    });
            }
    
            handleClear();
        }
    };
    

    useEffect(() => {
        if (berger.length > 0) {
            const b = berger[0];
            setDescription(b.description || '');
            setName(b.name || '');
            setPrice(b.price || '');
            console.log(berger);
        }
    }, [berger]);

    return (
        <div>
            <form className="container mt-4">
                <div className="card border-light bg-transparent">
                    <h1 className="border-light card-header text-info text-center"> Ajout des Berger</h1>
                    <div className="card-body">
                        <div className="mb-3" >
                            <label htmlFor="name" className="form-label text-info">Nom</label>
                            <input className={`form-control bg-transparent text-info`} value={name} name="name" type="text" id="name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label text-info">Prix</label>
                            <input value={price} className={`form-control bg-transparent text-info`} name="price" type="text" id="price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label text-info">Description</label>
                            <textarea value={description} className={`form-control bg-transparent text-info`} name="description" type="text" id="description" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <button type="submit" className={`btn btn-${berger.length > 0 ? 'warning' : 'success'} col-3 offset-4`} onClick={(event) => handleAdd(event)}>{berger.length > 0 ? 'Modifier' : 'Sauvegarder'}</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}