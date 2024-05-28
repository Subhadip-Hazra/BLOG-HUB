import React from 'react';
import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';

function TermsAndConditions() {
    return (
        <div>
            <PageHeader title={"Terms amd condition"} path={"Terms-condition"} />
        <div className="bg-[#FAFAFA] min-h-screen py-8 px-4 sm:px-6 lg:px-8 text-justify text-align-last-justify">
            <div className="max-w-3xl mx-auto">
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Welcome to Blog Hub!</h2>
                    <p className="mb-4">
                        {"These terms and conditions outline the rules and regulations for the use of Blog Hub's Website, located at BlogHub.com."}
                    </p>
                    <p className="mb-4">
                        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Blog Hub if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Cookies</h2>
                    <p className="mb-4">
                       {" We employ the use of cookies. By accessing Blog Hub, you agree to use cookies in agreement with Blog Hub's Privacy Policy."}
                    </p>
                    <p className="mb-4">
                       {" Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies."}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Content Posting and Comments</h2>
                    <p className="mb-4">
                        Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Blog Hub does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Blog Hub, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Blog Hub shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Hyperlinking</h2>
                    <p className="mb-4">
                        The following organizations may link to our Website without prior written approval:
                    </p>
                    <ul className="list-disc pl-8 mb-4">
                        <li>• Government agencies;</li>
                        <li>• Search engines;</li>
                        <li>• News organizations;</li>
                        <li>• Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                        <li>• System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.</li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">iFrames</h2>
                    <p className="mb-4">
                        Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Content Liability</h2>
                    <p className="mb-4">
                        We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Reservation of Rights</h2>
                    <p className="mb-4">
                        We reserve the right to request that you remove all links or any particular link to our Website. You agree to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Removal of links from our website</h2>
                    <p className="mb-4">
                        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links, but we are not obligated to do so or to respond to you directly.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
                    <p className="mb-4">
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                    </p>
                    <ul className="list-disc block pl-8 mb-4">
                        <li>• Limit or exclude our or your liability for death or personal injury;</li>
                        <li>• Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>• Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>• Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>
                    <p className="mb-4">
                        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
                    </p>
                    <p className="mb-4">
                        As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                    </p>
                </section>
            </div>
            <Footer/>
        </div>
        </div>
    );
}

export default TermsAndConditions;
