"use client"
import React from 'react'
import { Card } from 'react-bootstrap'
import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';

function page() {

  const router = useRouter();
  //  const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<String>();

  return (
    <>
        <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "100vh" }}
            >
              <Card className="p-4 w-[30vw]">
                <h4>Forgot password</h4>
                <p className='small mb-4'>Please enter your registered email-id to receive a verification code</p>
                <div>
                  <form>
                    <div>
                      {/* <label className="form-label">Email</label> */}
                      <input
                        type="text"
                        placeholder="john.doe@example.com"
                        
                        className="form-field py-2"
                      />
                    </div>

                    <div className="text-end mt-3">
                      {/* <Link href="/forgotpassword" className="text-decoration-none">
                        Forgot Password?
                      </Link> */}
                    </div>
      
                    <div className="mt-4 text-end">
                      <button type="submit" className="btn btn-primary w-100 p-2">
                        Submit
                      </button>
                       <button type="submit" className="btn w-100 p-2 mt-2 border-0" onClick={(e) => {router.back(), e.preventDefault()}}>
                        Back
                      </button>
                      
                    </div>
                  </form>
                </div>
              </Card>
            </div>
    </>
  )
}

export default page
