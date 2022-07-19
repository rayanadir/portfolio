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
            "hrnet0",
            "hrnet1",
            "hrnet2",
            "hrnet3"
        ],
        other_links: [
            { 
                'hrnet_link_0' : 'https://www.npmjs.com/package/react-modal-library-rayan-dahmena', 
            },
            {
                'hrnet_link_1' : 'https://github.com/OpenClassrooms-Student-Center/P12_Front-end',
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
            "argentbank0",
            "argentbank1",
            "argentbank2",
            "argentbank3",
            "argentbank4"
        ],
        other_links: [
            { 
                'argentbank_link_0' : 'https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API', 
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
            "sportsee0",
            "sportsee1",
            "sportsee2",
            "sportsee3"
        ],
        other_links: [
            { 
                'sportsee_link_0' : 'https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard', 
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
            "kasa0",
            "kasa1",
        ],
        other_links: [
            { 
                'kasa_link_0' : 'https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard', 
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
            "billed0",
            "billed1",
        ],
        other_links: [
            { 
                'billed_link_0' : 'https://github.com/OpenClassrooms-Student-Center/Billed-app-FR-back', 
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
            "lespetitsplats0",
            "lespetitsplats1",
            "lespetitsplats2",
            "lespetitsplats3",
            "lespetitsplats4"
        ],
        other_links: [
            { 
                'lespetitsplats_link_0' : 'https://github.com/rayanadir/RayanDahmena_7_06112021/blob/main/fiche_investigation.pdf', 
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
            "fisheye0",
            "fisheye1",
            "fisheye2",
            "fisheye3",
            "fisheye4",
            "fisheye5",
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
            "gameon1",
            "gameon2",
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
            "ohmyfood0",
            "ohmyfood1",
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
            "reservia0",
            "reservia1",
        ],
        other_links: [],
        responsive:true,
        images: [home_desk_p2,home_mobile_p2], 
    },
]