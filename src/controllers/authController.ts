import { Request, Response } from 'express';

// get the user details
export const userDetail = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const response = await fetch(
            `${process.env.OKTA_BASEURL}/api/v1/users/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
                },
            }
        );
        const parsedVal = await response.json();
        res.status(200).json(parsedVal);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// update the user profile 
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId
        const response = await fetch(
            `${process.env.OKTA_BASEURL}/api/v1/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `SSWS ${process.env.OKTA_TOKEN}`,
                },
                body: JSON.stringify(req.body),
            }
        );
        const parsedVal = await response.json();
        res.status(200).json(parsedVal);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};



