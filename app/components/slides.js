import React from 'react'

export default function slides() {
    const international = Intl?.DateTimeFormat().resolvedOptions();
    let timeZ = international.timeZone;
    let locale = international.locale;
    const continent = timeZ.split('/')[0];

    const calcPerc = (amount) => {
        switch (continent.toLowerCase()) {
            case 'europe':
                return (60 / 100) * amount;
            default:
                return amount;
        }
    }

    const theraSlides = [
        {
            title: 'Individual Massage',
            body: 'Deep Tissue Massage with Hot Stone & Foot Massage Treatment',
            duration: '1hr, 30mins',
            cost: calcPerc(100),
            url: "deep_tissue_massage_with_hot_stone_and_foot_massage_treatment",
            description: {
                detail: 'Treat yourself to a moment of tranquility with a tailored, one-on-one massage designed to ease tension, reduce stress, and revitalize your body and mind.',
                offers: [
                    'Customized to Your Needs: Each session is personalized to target your specific areas of discomfort and tension, ensuring you get the maximum benefits',
                    'Professional Care: Our certified therapists use a variety of techniques — from Swedish to deep tissue, aromatherapy to hot stone — to promote healing and relaxation.',
                    'Stress-Free Zone: Step into a peaceful, serene environment designed for ultimate relaxation. Let go of your worries and enjoy a full hour of blissful, uninterrupted care.',
                ]
            }
        },
        {
            title: 'Individual Massage',
            body: 'Head Neck Shoulder Back Hands Therapy Hot Stone Massage & Foot Treatment',
            duration: '1hr, 40mins',
            cost: calcPerc(120),
            url: "head_neck_shoulder_back_hands_therapy_hot_stone_massage_and_foot_treatment",
            description: {
                detail: 'Treat yourself to a moment of tranquility with a tailored, one-on-one massage designed to ease tension, reduce stress, and revitalize your body and mind.',
                offers: [
                    'Customized to Your Needs: Each session is personalized to target your specific areas of discomfort and tension, ensuring you get the maximum benefits',
                    'Professional Care: Our certified therapists use a variety of techniques — from Swedish to deep tissue, aromatherapy to hot stone — to promote healing and relaxation.',
                    'Stress-Free Zone: Step into a peaceful, serene environment designed for ultimate relaxation. Let go of your worries and enjoy a full hour of blissful, uninterrupted care.',
                ]
            }
        },
        {
            title: 'Deluxe Massage',
            body: 'Swedish, Deep Tissue, Hot Stone Therapy, Aromatherapy, and Reflexology (All-Round Massage)',
            duration: '2hrs',
            cost: calcPerc(180),
            url: "luxurious_hrs_swedish_deep_tissue_hot_stone_aromatherapy_and_reflexology_massage",
            description: {
                detail: "Unwind, recharge, and pamper yourself with our exclusive Deluxe Massage. Designed for those who seek the ultimate in relaxation and rejuvenation, this luxurious treatment combines the best of massage therapy, premium products, and serene ambiance for a truly indulgent experience.",
                offers: [
                    "Extended Duration: Instead of the usual 60-minute or 90-minute massage, our deluxe massage can last 120 minutes or longer, allowing for more thorough work on the body.",
                    "Variety of Techniques: We combine multiple modalities such as Swedish, deep tissue, hot stone therapy, aromatherapy, or lymphatic drainage for a well-rounded experience.",
                    "Premium Products: The use of high-quality oils, lotions, or essential oils, sometimes infused with aromatic scents for added relaxation benefits.",
                    "Hot Stones or Heat Therapy: The use of heated stones or wraps to help soothe muscles and improve circulation.",
                    "Aromatherapy: We use essential oils or soothing scents to further promote relaxation, reduce stress, and create a calming atmosphere.",
                ]
            }
        },
        {
            title: 'Deluxe Massage',
            body: 'Swedish, Deep Tissue, Hot Stone Therapy, Aromatherapy, and Reflexology (All-Round Massage)',
            duration: '2hr, 30mins',
            cost: calcPerc(250),
            url: "luxurious_2_30mins_swedish_deep_tissue_hot_stone_aromatherapy_and_reflexology_massage",
            description: {
                detail: "Unwind, recharge, and pamper yourself with our exclusive Deluxe Massage. Designed for those who seek the ultimate in relaxation and rejuvenation, this luxurious treatment combines the best of massage therapy, premium products, and serene ambiance for a truly indulgent experience.",
                offers: [
                    "Extended Duration: Instead of the usual 60-minute or 90-minute massage, our deluxe massage can last 120 minutes or longer, allowing for more thorough work on the body.",
                    "Variety of Techniques: We combine multiple modalities such as Swedish, deep tissue, hot stone therapy, aromatherapy, or lymphatic drainage for a well-rounded experience.",
                    "Premium Products: The use of high-quality oils, lotions, or essential oils, sometimes infused with aromatic scents for added relaxation benefits.",
                    "Hot Stones or Heat Therapy: The use of heated stones or wraps to help soothe muscles and improve circulation.",
                    "Aromatherapy: We use essential oils or soothing scents to further promote relaxation, reduce stress, and create a calming atmosphere.",
                ]
            }
        },
        {
            title: 'Deluxe Massage',
            body: 'Swedish, Deep Tissue, Hot Stone Therapy, Aromatherapy, and Reflexology (All-Round Massage)',
            duration: '3hrs',
            cost: calcPerc(300),
            url: "luxurious_3hrs_swedish_deep_tissue_hot_stone_aromatherapy_and_reflexology_massage",
            description: {
                detail: "Unwind, recharge, and pamper yourself with our exclusive Deluxe Massage. Designed for those who seek the ultimate in relaxation and rejuvenation, this luxurious treatment combines the best of massage therapy, premium products, and serene ambiance for a truly indulgent experience.",
                offers: [
                    "Extended Duration: Instead of the usual 60-minute or 90-minute massage, our deluxe massage can last 120 minutes or longer, allowing for more thorough work on the body.",
                    "Variety of Techniques: We combine multiple modalities such as Swedish, deep tissue, hot stone therapy, aromatherapy, or lymphatic drainage for a well-rounded experience.",
                    "Premium Products: The use of high-quality oils, lotions, or essential oils, sometimes infused with aromatic scents for added relaxation benefits.",
                    "Hot Stones or Heat Therapy: The use of heated stones or wraps to help soothe muscles and improve circulation.",
                    "Aromatherapy: We use essential oils or soothing scents to further promote relaxation, reduce stress, and create a calming atmosphere.",
                ]
            }
        },
        {
            title: 'Erotic/Nuru Massage',
            body: 'Head, Neck, Shoulder, Back, Hands Therapy, Hot Stone Massage or Foot Treatment',
            duration: '2hrs, 50mins',
            cost: calcPerc(150),
            url: "head_neck_shoulder_back_hands_therapy_hot_stone_massage_or_foot_treatment",
            description: {
                detail: 'Unleash your senses and explore a world of indulgence with our Erotic Massage experience, where relaxation and sensuality meet in perfect harmony. Designed for those who seek a deeper, more intimate form of relaxation, our erotic massage offers a unique journey to enhance connection, release tension, and awaken your senses.',
                offers: [
                    "A bespoke experience tailored to your preferences, whether you are looking for soothing sensual touches or a more invigorating experience.",
                    "Soft lighting, gentle music, and a tranquil ambiance to help you fully unwind and embrace the moment.",
                    "A professional, respectful environment with trained therapists who prioritize your comfort and satisfaction.",
                    "The option to incorporate luxurious oils, aromatherapy, or candles for a heightened sensory experience.",
                ]
            }
        },
        {
            title: 'Erotic/Nuru Massage',
            body: 'Deep Tissue Massage, Reflexology (Foot and Hand) Massage, Hot Stone Massage or Shiatsu Massage',
            duration: '2hrs, 50mins',
            cost: calcPerc(150),
            url: "deep_tissue_massage_reflexology_massage_hot_stone_massage_or_shiatsu_massage",
            description: {
                detail: 'Unleash your senses and explore a world of indulgence with our Erotic Massage experience, where relaxation and sensuality meet in perfect harmony. Designed for those who seek a deeper, more intimate form of relaxation, our erotic massage offers a unique journey to enhance connection, release tension, and awaken your senses.',
                offers: [
                    "A bespoke experience tailored to your preferences, whether you are looking for soothing sensual touches or a more invigorating experience.",
                    "Soft lighting, gentle music, and a tranquil ambiance to help you fully unwind and embrace the moment.",
                    "A professional, respectful environment with trained therapists who prioritize your comfort and satisfaction.",
                    "The option to incorporate luxurious oils, aromatherapy, or candles for a heightened sensory experience.",
                ]
            }
        },
        {
            title: 'Erotic/Nuru Massage',
            body: 'Deep Tissue Massage, Reflexology, Hot Stone Massage or Shiatsu Massage with happy ending',
            duration: '2hrs',
            cost: calcPerc(250),
            url: "deep_tissue_massage_reflexology_massage_hot_stone_massage_or_shiatsu_massage_with_happy_ending",
            description: {
                detail: 'Unleash your senses and explore a world of indulgence with our Erotic Massage experience, where relaxation and sensuality meet in perfect harmony. Designed for those who seek a deeper, more intimate form of relaxation, our erotic massage offers a unique journey to enhance connection, release tension, and awaken your senses.',
                offers: [
                    "A bespoke experience tailored to your preferences, whether you are looking for soothing sensual touches or a more invigorating experience.",
                    "Soft lighting, gentle music, and a tranquil ambiance to help you fully unwind and embrace the moment.",
                    "A professional, respectful environment with trained therapists who prioritize your comfort and satisfaction.",
                    "The option to incorporate luxurious oils, aromatherapy, or candles for a heightened sensory experience.",
                ]
            }
        },
        {
            title: 'Erotic/Nuru Massage',
            body: "Deep Tissue Massage, Reflexology, Hot Stone Massage or Shiatsu Massage with happy ending",
            duration: '3hrs',
            cost: calcPerc(350),
            url: "deep_tissue_massage_reflexology_massage_hot_stone_massage_or_shiatsu_massage_with_happy_ending_2_masseuses",
            description: {
                detail: 'Unleash your senses and explore a world of indulgence with our Erotic Massage experience, where relaxation and sensuality meet in perfect harmony. Designed for those who seek a deeper, more intimate form of relaxation, our erotic massage offers a unique journey to enhance connection, release tension, and awaken your senses.',
                offers: [
                    "A bespoke experience tailored to your preferences, whether you are looking for soothing sensual touches or a more invigorating experience.",
                    "Soft lighting, gentle music, and a tranquil ambiance to help you fully unwind and embrace the moment.",
                    "A professional, respectful environment with trained therapists who prioritize your comfort and satisfaction.",
                    "The option to incorporate luxurious oils, aromatherapy, or candles for a heightened sensory experience.",
                ]
            }
        },
        {
            title: "Couple's Massage",
            body: "Couples Head, Neck, Shoulder, Back, Hands Therapy, Hot Stone Massage & Foot Treatment",
            duration: "2hrs",
            cost: calcPerc(300),
            url: "head_neck_shoulder_back_hands_therapy_hot_stone_massage_and_foot_treatment_couples",
            description: {
                detail: "Create lasting memories with a shared experience that soothes both body and soul. Our Couple's Massage offers the perfect opportunity to relax, rejuvenate, and reconnect with your partner in a tranquil, private setting. Whether it's for a romantic escape, a special celebration, or simply an opportunity to enjoy quality time together, our personalized massages will leave you both feeling refreshed and revitalized.",
                offers: [
                    "Side-by-side massages in a serene, private setting.",
                    "Customized treatments tailored to your preferences—whether you choose a soothing Swedish, deep tissue, or aromatic massage.",
                    "A calming ambiance with soft music, aromatherapy, and tranquil surroundings to enhance your experience.",
                    "Option to include add-ons like hot stones, scalp massages, or essential oil enhancements.",
                ]
            }
        },
        {
            title: "Couple's Massage",
            body: "Swedish Massage with Hot Stone or Deep Tissue Massage with Hot Stone",
            duration: "1hr, 30mins",
            cost: calcPerc(200),
            url: "sweedish_massage_with_hot_stone_or_deep_tissue_massage_with_hot_stone",
            description: {
                detail: "Create lasting memories with a shared experience that soothes both body and soul. Our Couple's Massage offers the perfect opportunity to relax, rejuvenate, and reconnect with your partner in a tranquil, private setting. Whether it's for a romantic escape, a special celebration, or simply an opportunity to enjoy quality time together, our personalized massages will leave you both feeling refreshed and revitalized.",
                offers: [
                    "Side-by-side massages in a serene, private setting.",
                    "Customized treatments tailored to your preferences—whether you choose a soothing Swedish, deep tissue, or aromatic massage.",
                    "A calming ambiance with soft music, aromatherapy, and tranquil surroundings to enhance your experience.",
                    "Option to include add-ons like hot stones, scalp massages, or essential oil enhancements.",
                ]
            }
        }
    ]
    return theraSlides;
}

