
import styles from '@/styles/BackgroundStripes.module.css'

const BackgroundStripes = () => {
    return (
        
        <div className={styles.StripesWrap}>
            <div className={styles.Stripes}>
                <div className={styles.Stripe}></div>
                <div className={styles.Stripe}></div>
                <div className={styles.Stripe}></div>
                <div className={styles.Stripe}></div>
                <div className={styles.Stripe}></div>
            </div>
        </div>
    )
}

export default BackgroundStripes;
