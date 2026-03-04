import React from "react";


function Form() {

    return (
        <>
            <div>
                <div>
                    <label htmlFor="name">Name :</label>
                    <input id="name" type="text" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" id="dob" />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" id="age" />
                </div>
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" name="phone" id="phone" />
                </div>
                <div>
                    <label htmlFor="website">Website</label>
                    <input type="url" name="website" id="website" />
                </div>
                <div>
                    <label htmlFor="exp">Experience:</label>
                    <input type="range" name="exp" id="exp" min='0' max='10'/>
                </div>
                <div>
                    <label htmlFor="">Gender:</label><br />

                    <label htmlFor="male">Male</label>
                    <input type="radio" name="gender" id="male" value='male'/><br />

                    <label htmlFor="female">Female</label>
                    <input type="radio" name="gender" id="female" value='female' /><br />

                    <label htmlFor="other">Other</label>
                    <input type="radio" name="gender" id="other" value='other' /><br />

                </div>
                <div>
                  <label htmlFor="">Skill :</label><br />

                  <input type="checkbox" name="skill" value='html' id="html" />
                  <label htmlFor="html">HTML</label><br />
                  
                  <input type="checkbox" name="skill" value='js' id="js" />
                  <label htmlFor="js">Javascript</label><br />

                  <input type="checkbox" name="skill" value='css' id="css" />
                  <label htmlFor="css">CSS</label><br />

                  <input type="checkbox" name="skill" value='tailwind' id="tailwind" />
                  <label htmlFor="tailwind">Tailwind</label><br />

                  <input type="checkbox" name="skill" value='django' id="django" />
                  <label htmlFor="django">Django</label><br />

                  <input type="checkbox" name="skill" value='python' id="python" />
                  <label htmlFor="python">Python</label><br />

                  <input type="checkbox" name="skill" value='react' id="react" />
                  <label htmlFor="react">React</label><br />

                  <input type="checkbox" name="skill" value='next' id="next" />
                  <label htmlFor="next">Next</label><br />

                  <input type="checkbox" name="skill" value='laravel' id="laravel" />
                  <label htmlFor="laravel">Laravel</label><br />

                  <input type="checkbox" name="skill" value='mongo' id="mongo" />
                  <label htmlFor="mongo">MongoDB</label><br />

                  <input type="checkbox" name="skill" value='sql' id="sql" />
                  <label htmlFor="sql">MySQL</label><br />

                </div>
                <div>
                    <label htmlFor="country">Country :</label>
                    <select name="country" id="country">
                        <option value="">Select Country</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="India">India</option>
                        <option value="srilanka">SriLanka</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="bhutan">Bhutan</option>
                        <option value="nepal">Nepal</option>
                    </select>
                </div><br />
                <div>
                    <label htmlFor="picture">Picture</label>
                    <input type="file" name="picture" id="picture" />
                </div><br />
                <div>
                    <label htmlFor="time">Preferred Time</label>
                    <input type="time" name="prefertime" id="time" />
                </div><br />
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <input type="hidden" name="hidden" value='passid' />
                </div>
<div>
    <input type="submit" value="Submit" />
</div>
            </div>
        </>
    )
}

export default Form