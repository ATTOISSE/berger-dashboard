import { useEffect, useState } from "react"
import { getBergers } from "../../../services/productService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function ListBerger() {
    const [bergers, setBergers] = useState([])
    const [berger, setBerger] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getBergers()
            .then(response => {
                setBergers(response.data);
            })
            .catch(error => {
                console.error("Une erreur s'est produit lors du chargement ...", error);
            });
    }, []);

    const handleArchive = (e,id) => {
        e.preventDefault()
        Swal.fire({
          title: "Voulez-vous archiver?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, Archive le"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Archivé !",
              text: "votre fichier a été archivé",
              icon: "success"
            });
            const filterBergers = bergers.filter(berger => berger.id != id)
            setBergers(filterBergers)
          } 
        });
      };
      
    const handleEdit = (e,id)=>{
        e.preventDefault()
        const filterBerger = bergers.filter(berg => berg.id === id)
        setBerger(filterBerger)
        console.log(filterBerger);
    }  

    useEffect(()=>{
        if (berger != null) {
            navigate('/admin/add-berger',{state:{berger}})
        }
    },[berger])
    return (
        <div className=" mt-4 ">
            <table className="table table-responsive table-dark">
                <thead>
                    <tr key="">
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bergers.length > 0  ? (
                            bergers.map((berger, index) => (
                                <tr key={index}>
                                    <td>{berger.name}</td>
                                    <td>{berger.price} €</td>
                                    <td>{berger.description}</td>
                                    <td>
                                        <button className="btn btn-outline-warning mx-2" onClick={(event)=>handleEdit(event,berger.id)}>Modifier</button>
                                        <button className="btn btn-outline-danger" onClick={(event)=>handleArchive(event,berger.id)}>Archiver</button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr key="">
                            <td colSpan="5">Aucun berger</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}