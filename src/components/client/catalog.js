import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { getBergers, postBerger, putBerger } from "../../services/productService";
import Swal from "sweetalert2";
import axios from "axios";
import { Nav } from "../../nav";


export function Catalog() {
      
  const [bergers, setBergers] = useState([])
  const [count, setCount] = useState(0)
  const [commandes, setCommandes] = useState([])
  const [berger, setBerger] = useState(null)
  const notifyAddCart = () => toast("Ajout au panier avec succés !!!")
  
  useEffect(() => {
      getBergers()
      .then(response => {
        setBergers(response.data);
      })
      .catch(error => {
        console.error("Une erreur s'est produit lors du chargement ...", error);
      });
  }, []);
  
  const addcart = (id)=>{
    setCount(preCount => preCount+1)
    const btn =document.querySelector(`#btn${id}`);
    const commande = bergers.filter(berger => berger.id == id)
    setCommandes([...commandes,...commande]);
    notifyAddCart()
    btn.setAttribute('disabled','')
  }

  const navigate = useNavigate()
  const goToOrderDetails = () => {
    navigate('/client/commande', { state:{commandes} });
  };

  const addBerger = (berg) => {
    if (berg.id) {
      axios.put(`http://localhost:8000/burgers/${berg.id}`, berg)
      .then(response => {
        setBergers(bergers.map(b => b.id === berg.id ? response.data : b));
      });    } else {
      const newId = bergers.length > 0 ? Math.max(...bergers.map(b => b.id)) + 1 : 1;
      const bergerWithId = { ...berg, id: newId };
      postBerger(bergerWithId)
      .then(response =>{
        setBergers([...bergers,response.data]);
        });
    }
    setBerger(null);
 }

 const handleArchive = (id) => {
  Swal.fire({
    title: "Voulez-vous supprimer?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, Supprime le"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Supprimé !",
        text: "votre fichier a été supprimé",
        icon: "success"
      });
      const filterBergers = bergers.filter(berger => berger.id != id)
      setBergers(filterBergers)
    } 
  });
};
  
  const handleUpdate = (id)=>{
    const filterBerger = bergers.filter(berger => berger.id == id)
    setBerger(filterBerger);
  }
   console.log(bergers);
   
    return<>
    <Nav/>
      <a className="nav-link mx-5 my-1 offset-10" href="#"></a>
        <h1 className='mt-4 text-center'>Bienvenue dans notre catalogue <a href=""  onClick={goToOrderDetails}> <i className="bi bi-cart-dash fs-2 offset-2 text-primary"><sup className='text-danger fw-bold '>{count}</sup></i> </a></h1>
      <div className="App-catalog">
        <div className='container mt-4'>
          <div className='row mt-4'>
            {bergers.map((berger, index) => (
              <div key={index} className='col-md-3 mb-4 mt-3'>
                <div className="card  flex-x">
                  <img className="card-img-top" src={berger.picture} alt="Card image cap" width="100%" height="300" />
                  <div className="card-body bg-body-tertiary">
                    <h2 className="card-title text-capitalize">{berger.name}</h2>
                    <h3 className="card-title text-info">{berger.price} € </h3>
                    <p className="card-text">{berger.description}.</p>
                  </div>
                  <button  id={`btn${berger.id}`} className="btn btn-info text-light" onClick={()=>addcart(berger.id)}>Ajouter au panier</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
}

