import main_background_p14 from '../img/p14/background-p14.jpg';
import employee_list_p14 from '../img/p14/employee-list.png';
import login_background_p13 from '../img/p13/login-background-p13.png';
import main_background_p13 from '../img/p13/main-background-p13.png';
import main_background_p12 from '../img/p12/main-background-p12.png';
import desk_about_p11 from '../img/p11/desk_about_p11.png';
import desk_apartment_p11 from '../img/p11/desk_apartment_p11.png';
import desk_home_p11 from '../img/p11/desk_home_p11.png';
import mobile_about_p11 from '../img/p11/mobile_about_p11.png';
import mobile_apartment_p11 from '../img/p11/mobile_apartment_p11.png';
import mobile_home_p11 from '../img/p11/mobile_home_p11.png';
import add_bill_p9 from '../img/p9/add_bill_p9.png';
import bills_list_p9 from '../img/p9/bills_list_p9.png';
import main_image_filter_p7 from '../img/p7/main_image_filter_p7.png';
import main_image_p7 from '../img/p7/main_image_p7.png';
import main_image_text_p7 from '../img/p7/main_image_text_p7.png';
import desk_carousel_p6 from '../img/p6/desk_carousel_p6.png';
import home_desk_p6 from '../img/p6/home_desk_p6.png';
import home_mobile_p6 from '../img/p6/home_mobile_p6.png';
import photographer_desk_p6 from '../img/p6/photographer_desk_p6.png';
import photographer_mobile_p6 from '../img/p6/photographer_mobile_p6.png';
import home_desk_p4 from '../img/p4/home_desk_p4.png';
import home_form_mobile_p4 from '../img/p4/home_form_mobile_p4.png';
import home_form_p4 from '../img/p4/home_form_p4.png';
import home_mobile_p4 from '../img/p4/home_mobile_p4.png';
import home_desk_p3 from '../img/p3/home_desk_p3.png';
import home_mobile_p3 from '../img/p3/home_mobile_p3.png';
import restaurant_desk_p3 from '../img/p3/restaurant_desk_p3.png';
import restaurant_mobile_p3 from '../img/p3/restaurant_mobile_p3.png';
import home_desk_p2 from '../img/p2/home_desk_p2.png';
import home_mobile_p2 from '../img/p2/home_mobile_p2.png';

export const PROJECTS = [
    {
        id:'hrnet',
        title: 'HRNet React',
        description: 'hrnet',
        github_repo_link: 'https://github.com/rayanadir/Rayan_Dahmena_14_28052022',
        website_link: 'https://rayanadir.github.io/Rayan_Dahmena_14_28052022/',
        main_image: [main_background_p14],
        stack: ['React', 'Redux', 'NPM'],
        paragraphers: [
            "The HRNet React app allows user to add employees by a simple form, they're visible from the current employees page, which sorts employees by multiple fields.",
            "This website, initially built with jQuery, is now fully converted into React in order to improve the performance.",
            "NPM packages are installed including my own modal available below.",
            "Redux is used to manage the website state."
        ],
        other_links: [
            { 
                'React modal NPM package' : 'https://www.npmjs.com/package/react-modal-library-rayan-dahmena', 
            },
            {
                'jQuery Github repository link' : 'https://github.com/OpenClassrooms-Student-Center/P12_Front-end',
            }
        ],
        responsive:false,
        images: [main_background_p14, employee_list_p14],
    },
    {
        id:'argentbank',
        title: 'ArgentBank',
        description: 'argentbank',
        github_repo_link: 'https://github.com/rayanadir/Rayan_Dahmena_13_03052022',
        website_link: '',
        main_image: [main_background_p13],
        stack: ['React', 'Redux', 'Node.js', 'MongoDB'],
        paragraphers: [
            "This app allows user to log in and access to the profile.",
            "The user can see and edit his own profile, which will be kept in the Mongo database.",
            "Redux is used to manage the website state.",
            "It fetches API with axios to get user data.",
            "More below."
        ],
        other_links: [
            { 
                'Backend Github repository link' : 'https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API', 
            },
        ],
        responsive:true,
        images: [main_background_p13, login_background_p13],        
    },
    {
        id:'sportsee',
        title: 'Sportsee',
        description: 'sportsee',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_12_03042022',
        website_link: '',
        main_image: [main_background_p12],
        stack: ['React','Node.js'],
        paragraphers: [
            "Sportsee allows you to visit two user profiles, you can see their performances through charts.",
            "This project uses Recharts library to make charts.",
            "It fetches API with axios to get user data.",
            "More below."
        ],
        other_links: [
            { 
                'Backend Github repository link' : 'https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard', 
            },
        ],
        responsive:false,
        images: [main_background_p12], 
    },
    {
        id:'kasa',
        title: 'Kasa',
        description: 'kasa',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_11_11032022',
        website_link: '',
        main_image: [desk_home_p11],
        stack: ['React'],
        paragraphers: [
            "Kasa is an apartment listing website.",
            "Each apartment has its page, you can navigate through apartment's pictures.",
        ],
        other_links: [
            { 
                'Backend Github repository link' : 'https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard', 
            },
        ],
        responsive:true,
        images: [desk_home_p11,desk_apartment_p11,desk_about_p11,mobile_home_p11,mobile_apartment_p11,mobile_about_p11], 
    },
    {
        id:'billed',
        title: 'Billed',
        description: 'billed',
        github_repo_link: 'https://github.com/rayanadir/Rayan_Dahmena_9_12012022',
        website_link: '',
        main_image: [add_bill_p9],
        stack: ['HTML','CSS','JS','Jest', 'SQLite'],
        paragraphers: [
            "Billed is a website for adding bills for employees.",
            "The main goals are to correct bugs with the chrome debugger and to write unit tests.",
        ],
        other_links: [
            { 
                'Backend Github repository link' : 'https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back', 
            },
        ],
        responsive:false,
        images: [add_bill_p9, bills_list_p9], 
    },
    {
        id:'lespetitsplats',
        title: 'Les petits plats',
        description: 'lespetitsplats',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_7_06112021',
        website_link: 'https://rayanadir.github.io/RayanDahmena_7_06112021/',
        main_image: [main_image_p7],
        stack: ['HTML','SASS','JS'],
        paragraphers: [
            "This website shows recipes that you can filter by the search bar or simples filters.",
            "The github repository contains algo1 and algo2 branches.",
            "Algo1 branch filters with the array object method",
            "Algo2 branch filters with the Javascript natives loop",
            "More on the main branch, fiche_investigation.pdf"
        ],
        other_links: [
            { 
                'Investigation file' : 'https://github.com/rayanadir/RayanDahmena_7_06112021/blob/main/fiche_investigation.pdf', 
            },
        ],
        responsive:false,
        images: [main_image_p7,main_image_filter_p7,main_image_text_p7], 
    },
    {
        id:'fisheye',
        title: 'FishEye',
        description: 'fisheye',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_6_19102021',
        website_link: 'https://rayanadir.github.io/RayanDahmena_6_19102021/',
        main_image: [home_desk_p6],
        stack: ['HTML','SASS','JS'],
        paragraphers: [
            "The main page shows photographers that you can filters with tags.",
            "You can access to the photographers page with their medias.",
            "Navigation through medias with the carousel.",
            "Click on like media to increment the total likes.",
            "Open a modal form to contact the photographer, a successful submit shows the result in the console.",
            "NB : there is no backend server, no data will be sent, this is just a form mock",
        ],
        other_links: [],
        responsive:true,
        images: [home_desk_p6,home_mobile_p6,photographer_desk_p6,photographer_mobile_p6,desk_carousel_p6], 
    },
    {
        id:'gameon',
        title: 'GameOn',
        description: 'gameon',
        github_repo_link: 'https://github.com/rayanadir/Rayan_Dahmena_4_05102021',
        website_link: 'https://rayanadir.github.io/Rayan_Dahmena_4_05102021/',
        main_image: [home_desk_p4],
        stack: ['HTML','CSS','JS'],
        paragraphers: [
            "Open a modal form and register yourself to GameOn.",
            "NB : there is no backend server, no data will be sent, this is just a form mock",
        ],
        other_links: [],
        responsive:true,
        images: [home_desk_p4,home_mobile_p4,home_form_p4,home_form_mobile_p4], 
    },
    {
        id:'ohmyfood',
        title: 'OhMyFood',
        description: 'ohmyfood',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_3_31082021',
        website_link: 'https://rayanadir.github.io/RayanDahmena_3_31082021/',
        main_image: [home_desk_p3],
        stack: ['HTML','SASS'],
        paragraphers: [
            "OhMyFood is a restaurant website, choose a restaurant and select a dish.",
            "Dishes apperance are dynamized by CSS animations, using SASS.",
        ],
        other_links: [],
        responsive:true,
        images: [home_desk_p3,home_mobile_p3,restaurant_desk_p3,restaurant_mobile_p3], 
    },
    {
        id:'reservia',
        title: 'Reservia',
        description: 'reservia',
        github_repo_link: 'https://github.com/rayanadir/RayanDahmena_2_21082021',
        website_link: 'https://rayanadir.github.io/RayanDahmena_2_21082021/',
        main_image: [home_desk_p2],
        stack: ['HTML','CSS'],
        paragraphers: [
            "Reservia is a vacation booking website.",
            "NB : this website has no functionnalities, it is just a sketch integration in HTML, CSS.",
        ],
        other_links: [],
        responsive:true,
        images: [home_desk_p2,home_mobile_p2], 
    },
]